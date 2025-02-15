const fs = require('fs');
const path = require('path');
const User = require('../models/users');
const usersFilePath = path.join(__dirname, './src/data/users.json'); // Ruta al archivo users.json
const bcrypt = require('bcrypt'); // Importa bcrypt
const { profile } = require('console');

const userController = {
    registerUser: async (req, res) => {
        try {
            console.log("req.file:", req.file);

            if (!req.file) {
                return res.status(400).send("Debes seleccionar una imagen.");
            }

            const { nombre, NombreUsuario, Email, Contrasena } = req.body;

            const saltRounds = 10; // Número de rondas para bcrypt
            const hashedPassword = await bcrypt.hash(Contrasena, saltRounds); // Encripta la contraseña

            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            const newUser = {
                id: users.length ? parseInt(users[users.length - 1].id) + 1 : 1,
                nombre,
                NombreUsuario,
                Email,
                image: req.file.filename,
                Contrasena: hashedPassword // Guarda la contraseña encriptada
            };

            users.push(newUser);

            try {
                fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
            } catch (writeError) {
                console.error("Error al escribir users.json:", writeError);
                return res.status(500).send("Error al guardar el usuario.");
            }

            res.redirect('/users/login'); // Redirijo al login después del registro

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },

    loginUser: (req, res) => {
        const { usuario, Contrasena, remember } = req.body; // Obtén remember desde req.body

        try {
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            const user = users.find(u => u.nombreusuario === usuario || u.Email === usuario);

            if (!user) {
                return res.render('users/login', { error: "Usuario no encontrado." });
            }

            bcrypt.compare(Contrasena, user.contrasena, (err, result) => {
                if (err || !result) {
                    return res.render('users/login', { error: "Contraseña incorrecta." });
                }

                if (remember) { // Si remember es true, crea una cookie con el usuario
                    res.cookie('remember', usuario, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie por 30 días
                }

                req.session.user = user; // Guarda el usuario en la sesión
                res.redirect('/users/profile'); // Redirige al perfil
            });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => { // Callback para manejar errores
            if (err) {
                console.error("Error al destruir la sesión:", err);
                return res.redirect('/profile'); // O a donde quieras redirigir en caso de error
            }
            res.clearCookie('remember');
            res.redirect('/users/login');
        });
    },

    profileUser: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/users/login'); // Redirige si no hay usuario en la sesión
        }
    
        const user = req.session.user; // Obtiene el usuario de la sesión
        res.render('users/profile', { user }); // Renderiza la vista
    },

    updateProfile: async (req, res) => {
        try {
            const user = req.session.user; // Obtén el usuario de la sesión
            if (!user) {
                return res.redirect('/users/login'); // Redirige al login si no hay usuario
            }

            const { nombre, NombreUsuario, Email, Contrasena } = req.body;
            const updatedUser = {
                nombre: nombre || user.nombre, // Usa el valor actual si no se proporciona uno nuevo
                NombreUsuario: NombreUsuario || user.NombreUsuario,
                Email: Email || user.Email,
            };

            if (Contrasena) {
                updatedUser.Contrasena = await bcrypt.hash(Contrasena, 10);
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
};

module.exports = userController;