const path = require('path');
const { User, Rol, sequelize } = require('../database/models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const bcrypt = require('bcrypt');

const userController = {

    registerUser: async (req, res) => {
        console.log("req.body:", req.body);
        try {
            console.log("req.file:", req.file);
    
            if (!req.file) {
                return res.status(400).send("Debes seleccionar una imagen.");
            }
    
            const { first_name, last_name, user_name, email, user_password, security_question, security_answer, rol_id = 2 } = req.body; // Default rol_id = 2 para usuarios regulares
    
            console.log("Contraseña recibida:", user_password);
    
            const newUser = await User.create({
                first_name,
                last_name,
                user_name,
                email,
                image: req.file.filename,
                user_password: user_password, 
                security_question,
                security_answer,
                rol_id: parseInt(rol_id) 
            });
    
            res.redirect('/users/login');
    
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.render('users/register', { error: "Error interno del servidor.", ...req.body });
        }
    },

    loginUser: async (req, res) => {
        const { usuario, contrasena, remember } = req.body;
        console.log('Contraseña ingresada al login:', contrasena);
    
        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ user_name: usuario }, { email: usuario }]
                },
                include: [{ model: Rol, as: 'rol' }]
            });
    
            if (!user) {
                return res.render('users/login', { error: "Usuario no encontrado." });
            }
    
            console.log('Hash de la contraseña en la BD:', user.user_password); 
            const result = await bcrypt.compare(contrasena, user.user_password);
            if (!result) {
                return res.render('users/login', { error: "Contraseña incorrecta." });
            }
    
            if (user) {
                req.session.user = {
                    user_id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    email: user.email,
                    image: user.image,
                    rol_id: user.rol_id,
                    rol_name: user.rol ? user.rol.rol_name : null
                };
                console.log('Usuario logueado - req.session.user:', req.session.user);
    
                if (remember) {
                    res.cookie('remember', usuario, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
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
        const { id } = req.params;
        const loggedInUser = req.session.user;

        try {
            if (!loggedInUser) {
                return res.redirect('/users/login');
            }

            const { first_name, last_name, user_name, email, current_password, password: new_password, security_question, security_answer } = req.body;
            const updatedUser = {
                first_name: first_name || loggedInUser.first_name,
                last_name: last_name || loggedInUser.last_name,
                user_name: user_name || loggedInUser.user_name,
                email: email || loggedInUser.email,
                security_question: security_question || loggedInUser.security_question,
                security_answer: security_answer || loggedInUser.security_answer
            };

            if (new_password) {
                updatedUser.user_password = await bcrypt.hash(new_password, 10);
            } else if (current_password) {
                const isMatch = await bcrypt.compare(current_password, loggedInUser.user_password);
                if (!isMatch) {
                    return res.status(400).send("La contraseña actual es incorrecta.");
                }
            }

            if (req.file) {
                updatedUser.image = req.file.filename;
            }

            const userIdToUpdate = parseInt(id);

            if (loggedInUser.user_id === userIdToUpdate) {
                await User.update(updatedUser, { where: { user_id: userIdToUpdate } });
                req.session.user = { ...loggedInUser, ...updatedUser };
                res.redirect('/users/profile');
            } else if (loggedInUser.rol_id === 1) {
                await User.update(updatedUser, { where: { user_id: userIdToUpdate } });
                res.redirect('/users/adminUsers');
            } else {
                return res.render('users/profile', { error: "No tienes permisos para realizar esta acción.", user: req.session.user });
            }

        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            res.render('users/profile', { error: "Error interno del servidor.", user: req.session.user });
        }
    },

    getPreguntaSeguridad: async (req, res) => {
        const { usuario } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ user_name: usuario }, { email: usuario }]
                }
            });

            if (user) {
                res.json({ pregunta: user.security_question });
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
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ user_name: usuario }, { email: usuario }]
                }
            });

            if (!user) {
                return res.render('users/forgotPassword', { error: "Usuario no encontrado." });
            }

            const respuestaSeguridadAlmacenada = user.security_answer ? user.security_answer.trim().toLowerCase() : "";
            const respuestaIngresada = respuesta ? respuesta.trim().toLowerCase() : "";

            if (respuestaSeguridadAlmacenada !== respuestaIngresada) {
                return res.render('users/forgotPassword', { error: "Respuesta incorrecta." });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            await User.update({ user_password: hashedPassword }, { where: { user_id: user.user_id } });

            res.redirect('/users/login');
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            res.render('users/forgotPassword', { error: "Error interno del servidor.", ...req.body });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await User.destroy({ where: { user_id: id } });
            res.redirect('/users/adminUsers');
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },

    editUser: async (req, res) => {
        const { id } = req.params;
        try {
            const userToEdit = await User.findByPk(parseInt(id));
            if (!userToEdit) {
                return res.render('users/adminUsers', { error: 'Usuario no encontrado.' });
            }
            res.render('users/editUsers', { userToEdit });
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            res.render('users/adminUsers', { error: "Error interno del servidor." });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const loggedInUser = req.session.user;

        try {
            if (!loggedInUser) {
                return res.redirect('/users/login');
            }

            const { first_name, last_name, user_name, email, current_password, password: new_password, security_question, security_answer, rol_id } = req.body;
            const updatedUser = {
                first_name: first_name || loggedInUser.first_name,
                last_name: last_name || loggedInUser.last_name,
                user_name: user_name || loggedInUser.user_name,
                email: email || loggedInUser.email,
                security_question: security_question || loggedInUser.security_question,
                security_answer: security_answer || loggedInUser.security_answer,
                rol_id: loggedInUser.rol_id === 1 && rol_id ? parseInt(rol_id) : loggedInUser.rol_id // Solo admin puede cambiar rol
            };

            if (new_password) {
                updatedUser.user_password = await bcrypt.hash(new_password, 10);
            } else if (current_password) {
                const isMatch = await bcrypt.compare(current_password, loggedInUser.user_password);
                if (!isMatch) {
                    return res.status(400).send("La contraseña actual es incorrecta.");
                }
            }

            if (req.file) {
                updatedUser.image = req.file.filename;
            }

            const userIdToUpdate = parseInt(id);

            if (loggedInUser.user_id === userIdToUpdate) {
                await User.update(updatedUser, { where: { user_id: userIdToUpdate } });
                req.session.user = { ...loggedInUser, ...updatedUser };
                res.redirect('/users/profile');
            } else if (loggedInUser.rol_id === 1) {
                await User.update(updatedUser, { where: { user_id: userIdToUpdate } });
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
            const users = await User.findAll({
                include: [{ model: Rol, as: 'rol' }] // Incluye la información del rol
            });
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