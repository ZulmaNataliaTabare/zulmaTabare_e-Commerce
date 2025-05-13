
const checkUserSession = (req, res, next) => {
    // Siempre pasa la información del usuario a res.locals para la vista
    res.locals.user = req.session.user;

    // También guarda la información del usuario en req.session.userLogged para el controlador del carrito
    if (req.session && req.session.user) {
        req.session.userLogged = req.session.user;
    } else {
        // Asegúrate de que req.session.userLogged esté definido, aunque sea como null
        req.session.userLogged = null;
    }
    next();
};

module.exports = checkUserSession;




// const checkUserSession = (req, res, next) => {
//     res.locals.user = req.session.user; // Guarda el usuario en locals
//     next();
// };

// module.exports = checkUserSession; 