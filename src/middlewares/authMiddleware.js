
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next(); // Usuario logueado: permite continuar
    } else {
        return res.redirect('/users/login'); // Usuario NO logueado: redirige INMEDIATAMENTE al login
    }
};