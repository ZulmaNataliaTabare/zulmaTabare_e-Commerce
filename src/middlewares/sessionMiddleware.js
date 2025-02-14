
const session = require('express-session');

module.exports = session({
    secret: '123456', // ¡Cambia esto por una clave secreta real!
    resave: false,
    saveUninitialized: true
});