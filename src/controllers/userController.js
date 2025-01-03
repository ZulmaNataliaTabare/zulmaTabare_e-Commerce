const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');  // O usa una base de datos persistente si prefieres

const userController = {
    getAllUsers: (req, res) => {
        db.all("SELECT * FROM usuario", (err, users) => {
            if (err) {
                console.error('Error al obtener usuarios:', err);
                return res.status(500).send('Error al obtener usuarios.');
            }
            res.render('users', { users });
        });
    },
    registerUser: (req, res) => {
        const { nombre, NombreUsuario, Email, Nacimiento, Adress, Contrasena } = req.body;
        const sql = `INSERT INTO usuario (nombre, NombreUsuario, Email, Nacimiento, Adress, Contrasena) VALUES (?, ?, ?, ?, ?, ?)`;

        db.run(sql, [nombre, NombreUsuario, Email, Nacimiento, Adress, Contrasena], function(err) {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).send('Error al registrar el usuario.');
            }
            res.status(201).send('Usuario registrado con éxito');
        });
    }
};

module.exports = userController;

