// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
nombre: {
    type: String,
    required: true,
},
NombreUsuario: {
    type: String,
    required: true,
    unique: true,
},
Email: {
    type: String,
    required: true,
    unique: true,
},
Nacimiento: {
    type: Date,
    required: true,
},
Adress: {
    type: String,
    required: true,
},
Contrasena: {
    type: String,
    required: true,
},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
