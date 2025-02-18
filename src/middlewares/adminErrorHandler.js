// middlewares/adminErrorHandler.js
const { AdminError } = require('./authMiddleware'); // Importa la clase AdminError

module.exports = (err, req, res, next) => {
    if (err instanceof AdminError) {
        return res.status(err.statusCode).render('users/errorAdmin', { error: err.message }); // Pasa el mensaje de error a la vista
    }
    next(err); // Importante: Llama a next(err) para que otros middlewares manejen errores no AdminError
};