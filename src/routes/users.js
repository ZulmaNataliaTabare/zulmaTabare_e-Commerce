
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, profileUser, logout, updateProfile } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware'); // Importa el middleware de autenticación

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router
    .post('/register', upload.single('image'), registerUser)
    .get('/register', (req, res) => res.render('users/register'))
    .get('/cart', (req, res) => res.render('users/cart'))
    .get('/login', (req, res) => res.render('users/login'))
    .post('/login', loginUser)
    .get('/logout', logout) // Ruta para cerrar sesión
    .get('/profile', authMiddleware.isLoggedIn, profileUser) // Ruta protegida para el perfil
    .post('/profile', authMiddleware.isLoggedIn, upload.single('image'), updateProfile); // Ruta protegida para actualizar el perfil

module.exports = router;