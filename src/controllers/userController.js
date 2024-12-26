const User = require('../models/userModel');

const userController = {
getAllUsers: (req, res) => {
    User.find({}, (err, users) => {
    if (err) {
        return res.status(500).send('Error al obtener usuarios.');
    }
    res.render('users', { users });
    });
}
};

module.exports = userController;
