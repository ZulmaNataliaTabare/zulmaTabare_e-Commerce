
const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/users/login');
    }
    next();
};

class AdminError extends Error {
    constructor(message) {
        super(message);
        this.name = "AdminError"; 
        this.statusCode = 403; 
    }
}

const isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.rol_id !== 1) {
        throw new AdminError("No tienes permiso para acceder a esta página.");
    }
    next();
};

module.exports = {
    isLoggedIn,
    isAdmin,
    AdminError,
};