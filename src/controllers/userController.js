const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json'); // Ruta al archivo users.json
const bcrypt = require('bcrypt'); // Importa bcrypt

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
            const user = users.find(u => u.NombreUsuario === usuario || u.Email === usuario);

            if (!user) {
                return res.render('users/login', { error: "Usuario no encontrado." });
            }

            bcrypt.compare(Contrasena, user.Contrasena, (err, result) => {
                if (err || !result) {
                    return res.render('users/login', { error: "Contraseña incorrecta." });
                }

                if (remember) { // Ahora remember está definida
                    res.cookie('remember', usuario, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie por 30 días
                }

                req.session.user = user;
                const redirectPath = user.profile ? `/users/profile/${user.id}` : '/';
                res.redirect(redirectPath);
            });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send("Error interno del servidor.");
        }
    },

    logout: (req, res) => {
        // ... (código para cerrar sesión - sin cambios)
    },
};



module.exports = userController;