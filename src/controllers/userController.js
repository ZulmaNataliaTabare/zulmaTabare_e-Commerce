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

            await User.update(user.id, updatedUser); // Actualiza el usuario usando el ID
            req.session.user = { ...user, ...updatedUser }; // Actualiza la sesión con los nuevos datos
            res.redirect('/users/profile'); // Redirige al perfil actualizado
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

            if (!user || user. respuestaSeguridad !== respuesta) {
                return res.render('users/forgotPassword', { error: "Respuesta incorrecta." });
            }

            if (respuesta !== user.respuestaSeguridad) {
                return res.status(400).send("Respuesta incorrecta.");
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



};

module.exports = userController;