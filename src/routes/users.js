
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, profileUser, logout, updateProfile } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectIfLoggedIn = require('../middlewares/redirectIfLoggedIn');
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router
    .post('/register', upload.single('image'), registerUser)
    .get('/register', redirectIfLoggedIn, (req, res) => res.render('users/register')) // Middleware para usuarios NO logueados
    .post('/register', redirectIfLoggedIn, registerUser) // Middleware para usuarios NO logueados
    .get('/cart', authMiddleware.isLoggedIn, (req, res) => res.render('users/cart')) // Middleware para usuarios logueados
    .get('/login', redirectIfLoggedIn, (req, res) => res.render('users/login')) // Middleware para usuarios NO logueados
    .post('/login', redirectIfLoggedIn, loginUser) // Middleware para usuarios NO logueados
    .get('/logout', authMiddleware.isLoggedIn, logout) // Middleware para usuarios logueados
    .get('/profile', authMiddleware.isLoggedIn, profileUser) // Middleware para usuarios logueados
    .post('/profile', authMiddleware.isLoggedIn, upload.single('image'), updateProfile) // Middleware para usuarios logueados
    .get('/forgotPassword', redirectIfLoggedIn, (req, res) => res.render('users/forgotPassword'))  // Middleware para usuarios NO logueados
    .post('/getPreguntaSeguridad', redirectIfLoggedIn, userController.getPreguntaSeguridad)  // Middleware para usuarios NO logueados
    .post('/forgotPassword', redirectIfLoggedIn, userController.forgotPassword) // Middleware para usuarios NO logueados





    module.exports = router;