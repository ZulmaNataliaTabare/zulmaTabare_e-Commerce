const User = require('../models/users'); // Importa el modelo de usuarios

module.exports = async (req, res, next) => { // Usando async/await
    if (req.cookies.remember) {
        const usuarioRecordado = req.cookies.remember;

        try {
            const user = await User.findByUsername(usuarioRecordado); // Usando await
            if (user) {
                req.session.user = user;
            }
        } catch (error) {
            console.error("Error al recordar usuario:", error);
        }
    }
    next(); // Llama al siguiente middleware
};