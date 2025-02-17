
const { AdminError } = require('./authMiddleware'); // Importa la clase AdminError

module.exports = (err, req, res, next) => {
    if (err instanceof AdminError) {
        return res.status(err.statusCode).render('users/errorAdmin');
    }
    next(err);
};