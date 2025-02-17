const User = require('../models/users'); // Importa el modelo de usuarios

module.exports = async (req, res, next) => { // Usando async/await
    if (req.cookies.remember && !req.session.user) {
        const usuarioRecordado = req.cookies.remember;

        try {
            const user = await User.findByUsername(usuarioRecordado); // Usando await
            if (user) {
                req.session.user = user;
                res.locals.user = user; // Guarda el usuario en locals
            }else{
                res.clearCookie('remember');
            }
        } catch (error) {
            console.error("Error al recordar usuario:", error);
            res.clearCookie('remember');
        }
    }
    next(); // Llama al siguiente middleware
};