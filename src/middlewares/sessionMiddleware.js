
const session = require('express-session');

module.exports = session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
});