
const session = require('express-session');

module.exports = session({
    secret: '123456',
    resave: false,
    saveUninitialized: true
});