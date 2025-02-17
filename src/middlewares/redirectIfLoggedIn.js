
//middleware más para redirigir a los usuarios logueados a su perfil cuando intentan acceder 
// a rutas que solo deberían ser accesibles para usuarios no logueados (como la página de 
// inicio de sesión o registro).


module.exports = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile'); // Redirige al perfil si el usuario está logueado
    }
    next(); // Continúa si el usuario no está logueado
};