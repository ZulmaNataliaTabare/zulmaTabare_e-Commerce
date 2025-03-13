const fs = require('fs/promises');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const userController = {

    registerUser: async (req, res) => {
        console.log("req.body:", req.body);
        try {
            console.log("req.file:", req.file);

            if (!req.file) {
                return res.status(400).send("Debes seleccionar una imagen.");
            }

            const { nombre, apellido, nombreusuario, email, contrasena, preguntaSeguridad, respuestaSeguridad } = req.body;

            console.log("Contraseña recibida:", contrasena);

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const users = await User.getAll();
            const newUser = {
                id: users.length ? parseInt(users[users.length - 1].id) + 1 : 1,
                nombre,
                apellido,
                nombreusuario,
                email,
                image: req.file.filename,
                contrasena: hashedPassword,
                preguntaSeguridad,
                respuestaSeguridad,
            };

            try {
                await fs.writeFile(usersFilePath, JSON.stringify([...users, newUser], null, 2));
            } catch (writeError) {
                console.error("Error al escribir users.json:", writeError);
                return res.render('users/register', { error: "Error al guardar el usuario.", ...req.body });// Devuelve a la vista register con error
            }

            res.redirect('/users/login');

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.render('users/register', { error: "Error interno del servidor.", ...req.body });// Devuelve a la vista register con error
        }
    },


    loginUser: async (req, res) => {
        const { usuario, contrasena, remember } = req.body;

        try {
            const users = await User.getAll();
            const user = users.find(u => u.nombreusuario === usuario || u.email === usuario);

            if (!user) {
                return res.render('users/login', { error: "Usuario no encontrado." });
            }

            const result = await bcrypt.compare(contrasena, user.contrasena);
            if (!result) {
                return res.render('users/login', { error: "Contraseña incorrecta." });
            }

            if (user) {
                req.session.user = user;

                if (remember) {
                    res.cookie('remember', user.nombreusuario, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV === 'production',
                    });
                } else {
                    res.clearCookie('remember');
                }

                return res.redirect('/');
            } else {
                return res.render('users/login', { error: "Usuario o contraseña incorrectos." });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.render('users/login', { error: "Error interno del servidor.", ...req.body });
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al destruir la sesión:", err);
                return res.redirect('/profile');
            }
            res.clearCookie('remember');
            res.redirect('/users/login');
        });
    },

    profileUser: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/users/login');
        }

        const user = req.session.user;
        return res.render('users/profile', { user });
    },

    updateProfile: async (req, res) => {
        try {
            const user = req.session.user;
            if (!user) {
                return res.redirect('/users/login');
            }

            const { nombre, apellido, nombreusuario, email, contrasena } = req.body;
            const updatedUser = {
                nombre: nombre || user.nombre,
                apellido: apellido || user.apellido,
                nombreusuario: nombreusuario || user.nombreusuario,
                email: email || user.email,
            };

            if (contrasena) {
                updatedUser.contrasena = await bcrypt.hash(contrasena, 10);
            }

            if (req.file) {
                updatedUser.image = req.file.filename;
            }

            if (user.id === req.params.id) {
                await User.update(user.id, updatedUser);
                req.session.user = { ...user, ...updatedUser };
                res.redirect('/users/profile');
            } else if (user.isAdmin) {
                await User.update(req.params.id, updatedUser);
                res.redirect('/users/adminUsers');
            } else {
                return res.render('users/profile', { error: "No tienes permisos para realizar esta acción.", user: req.session.user }); // Devuelve a la vista profile con error
            }
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            res.render('users/profile', { error: "Error interno del servidor.", user: req.session.user });// Devuelve a la vista profile con error
        }
    },

    getPreguntaSeguridad: async (req, res) => {
        const { usuario } = req.body;

        try {
            const users = await User.getAll();
            const user = users.find(u => u.nombreusuario === usuario || u.email === usuario);

            if (user) {
                res.json({ pregunta: user.preguntaSeguridad });
            } else {
                res.json({ pregunta: null });
            }
        } catch (error) {
            console.error("Error al obtener pregunta de seguridad:", error);
            res.status(500).json({ pregunta: null });
        }
    },

    forgotPassword: async (req, res) => {
        const { usuario, respuesta, contrasena } = req.body;

        try {
            const users = await User.getAll();
            const user = users.find(u => u.nombreusuario === usuario || u.email === usuario);

            if (!user) {
                return res.render('users/forgotPassword', { error: "Usuario no encontrado." });
            }

            const respuestaSeguridadAlmacenada = user.respuestaSeguridad ? user.respuestaSeguridad.trim().toLowerCase() : "";
            const respuestaIngresada = respuesta ? respuesta.trim().toLowerCase() : "";

            if (respuestaSeguridadAlmacenada !== respuestaIngresada) {
                return res.render('users/forgotPassword', { error: "Respuesta incorrecta." });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            await User.update(user.id, { contrasena: hashedPassword });

            res.redirect('/users/login');
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            res.render('users/forgotPassword', { error: "Error interno del servidor.", ...req.body });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await User.delete(id);
            res.redirect('/users/adminUsers');
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },

    editUser: async (req, res) => {
        const { id } = parseInt(req.params.id);
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }
            res.render('users/editUser', { user });
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    
    updateUser: async (req, res) => {
        const { id } = req.params;
        const user = req.session.user;

        try {
            if (!user) {
                return res.redirect('/users/login');
            }

            const { nombre, apellido, nombreusuario, email, contrasena, preguntaSeguridad, respuestaSeguridad } = req.body;
            const updatedUser = {
                nombre: nombre || user.nombre,
                apellido: apellido || user.apellido,
                nombreusuario: nombreusuario || user.nombreusuario,
                email: email || user.email,
                preguntaSeguridad: preguntaSeguridad || user.preguntaSeguridad,
                respuestaSeguridad: respuestaSeguridad || user.respuestaSeguridad
            };

            if (contrasena) {
                updatedUser.contrasena = await bcrypt.hash(contrasena, 10);
            }

            if (req.file) {
                updatedUser.image = req.file.filename;
            }

            await User.update(id, updatedUser);

            if (user.id === id) {
                req.session.user = { ...user, ...updatedUser };
                res.redirect('/users/profile');
            } else if (user.isAdmin) {
                res.redirect('/users/adminUsers');
            } else {
                res.status(403).send("No tienes permisos para realizar esta acción.");
            }

        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    adminUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            const totalPages = Math.ceil(users.length / 10);
            const currentPage = req.query.page ? parseInt(req.query.page) : 1;
            const usersToShow = users.slice((currentPage - 1) * 10, currentPage * 10);

            res.render('users/adminUsers', { users: usersToShow, totalPages, currentPage });
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },


};

module.exports = userController;