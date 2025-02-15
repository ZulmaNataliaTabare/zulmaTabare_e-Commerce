
const checkUserSession = (req, res, next) => {
    res.locals.user = req.session.user; // Guarda el usuario en locals
    next();
};

module.exports = checkUserSession; 