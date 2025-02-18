const fs = require('fs/promises');
const path = require('path');
const User = require('../models/users');
const usersFilePath = path.join(__dirname, '../data/users.json'); 
const bcrypt = require('bcrypt'); // Importa bcrypt

const userController = {
    
    registerUser: async (req, res) => {
        console.log("req.body:", req.body); // Imprime req.body
        try {
            console.log("req.file:", req.file);

            if (!req.file) {
                return res.status(400).send("Debes seleccionar una imagen.");
            }

            const { nombre, nombreusuario, email, contrasena, preguntaSeguridad, respuestaSeguridad } = req.body;
            
            console.log("Contraseña recibida:", contrasena); // Imprime la contraseña

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const users = await User.getAll();
            const newUser = {
                id: users.length ? parseInt(users[users.length - 1].id) + 1 : 1,
                nombre,
                nombreusuario,
                email,
                image: req.file.filename,
                contrasena: hashedPassword,
                preguntaSeguridad, // Guarda la pregunta de seguridad
                respuestaSeguridad, // Guarda la respuesta de seguridad
            };

            try {
                await fs.writeFile(usersFilePath, JSON.stringify([...users, newUser], null, 2));
            } catch (writeError) {
                console.error("Error al escribir users.json:", writeError);
                return res.status(500).send("Error al guardar el usuario.");
            }

            res.redirect('/users/login');

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },

    loginUser: async (req, res) => { // async para usar await
        const { usuario, contrasena, remember } = req.body;

        try {
            const users = await User.getAll(); // Uso User.getAll() para leer los usuarios (asíncrono)
            const user = users.find(u => u.nombreusuario === usuario || u.email === usuario);

            if (!user) {
                return res.render('users/login', { error: "Usuario no encontrado." });
            }

            const result = await bcrypt.compare(contrasena, user.contrasena); // await para bcrypt.compare
            if (!result) {
                return res.render('users/login', { error: "Contraseña incorrecta." });
            }

            if (user) {
                req.session.user = user;

                if (remember) {
                    res.cookie('remember', user.nombreusuario, { // Crea la cookie 'remember'
                        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV === 'production',
                    });
                }else{
                    res.clearCookie('remember');
                }

                return res.redirect('/'); // Redirige a la ruta principal ('/') que renderiza index.ejs
            } else {
                return res.render('users/login', { error: "Usuario o contraseña incorrectos." }); // Renderiza la vista de login con el error
            } 
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send("Error interno del servidor.");
        }   
    },

    logout: (req, res) => {
        req.session.destroy((err) => { // Callback para manejar errores
            if (err) {
                console.error("Error al destruir la sesión:", err);
                return res.redirect('/profile'); // Redirige al perfil en caso de error
            }
            res.clearCookie('remember');
            res.redirect('/users/login');
        });
    },

    profileUser: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/users/login'); // Redirige al login si no hay sesión
        }
    
        const user = req.session.user;
        return res.render('users/profile', { user }); // Renderiza la vista users/profile
    },

    updateProfile: async (req, res) => {
        try {
            const user = req.session.user; // Obtén el usuario de la sesión
            if (!user) {
                return res.redirect('/users/login'); // Redirige al login si no hay usuario
            }
    
            const { nombre, nombreusuario, email, contrasena } = req.body;
            const updatedUser = {
                nombre: nombre || user.nombre, // Usa el valor actual si no se proporciona uno nuevo
                nombreusuario: nombreusuario || user.nombreusuario,
                email: email || user.email,
            };
    
            if (contrasena) {
                updatedUser.contrasena = await bcrypt.hash(contrasena, 10);
            }
    
            if (req.file) {
                updatedUser.image = req.file.filename;
            }
    
            // Distingue entre actualización de perfil de propio y actualización de perfil de otro usuario
            if (user.id === req.params.id) { // Actualización del perfil propio
                await User.update(user.id, updatedUser); // Actualiza el usuario usando el ID
                req.session.user = { ...user, ...updatedUser }; // Actualiza la sesión con los nuevos datos
                res.redirect('/users/profile'); // Redirige al perfil actualizado
            } else if (user.isAdmin) { // Actualización del perfil de otro usuario (solo para admin)
                await User.update(req.params.id, updatedUser);
                res.redirect('/users/adminUsers');
            } else {
                res.status(403).send("No tienes permisos para realizar esta acción.");
            }
    
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            res.redirect('/users/profile'); // Redirige al perfil en caso de error
        }
    },
    
    
    getPreguntaSeguridad: async (req, res) => {
        const { usuario } = req.body;

        try {
            const users = await User.getAll();
            const user = users.find(u => u.nombreusuario === usuario || u.email === usuario);

            if(user){
                res.json({ pregunta: user.preguntaSeguridad });
            }else{
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
    
            // Manejo condicional para respuestaSeguridad
            const respuestaSeguridadAlmacenada = user.respuestaSeguridad ? user.respuestaSeguridad.trim().toLowerCase() : ""; // Valor por defecto si es undefined
            const respuestaIngresada = respuesta ? respuesta.trim().toLowerCase() : ""; // Valor por defecto si es undefined
    
            if (respuestaSeguridadAlmacenada !== respuestaIngresada) {
                return res.render('users/forgotPassword', { error: "Respuesta incorrecta." });
            }
    
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    
            await User.update(user.id, { contrasena: hashedPassword });
    
            res.redirect('/users/login');
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            res.status(500).send("Error interno del servidor.");
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

    editUser:  async (req, res) => {
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
    
    updateUser:  async (req, res) => {
        const { id } = req.params;  // ID del usuario a actualizar
        const user = req.session.user; // Usuario logueado
    
        try {
            if (!user) {
                return res.redirect('/users/login');
            }
    
            const { nombre, nombreusuario, email, contrasena, preguntaSeguridad, respuestaSeguridad } = req.body;
            const updatedUser = {
                nombre: nombre || user.nombre,
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
    
            await User.update(id, updatedUser); // Actualiza el usuario
    
            if (user.id === id) { // Si el usuario actualiza su propio perfil
                req.session.user = { ...user, ...updatedUser }; // Actualiza la sesión
                res.redirect('/users/profile');
            } else if (user.isAdmin) { // Si un admin actualiza el perfil de otro usuario
                res.redirect('/users/adminUsers');
            } else {
                res.status(403).send("No tienes permisos para realizar esta acción.");
            }
    
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            res.status(500).send("Error interno del servidor"); // Enviar error 500
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