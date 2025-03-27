const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    profileUser,
    logout,
    updateProfile,
    getPreguntaSeguridad,
    forgotPassword,
    adminUsers,
    deleteUser,
    editUser,
    updateUser
} = require('../controllers/userController');
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

const { isLoggedIn, isAdmin } = authMiddleware;

router
    .get('/users/register', redirectIfLoggedIn, (req, res) => res.render('users/register'))
    .post('/users/register', redirectIfLoggedIn, upload.single('image'), registerUser)
    .get('/users/cart', isLoggedIn, (req, res) => res.render('users/cart'))
    .get('/users/login', redirectIfLoggedIn, (req, res) => res.render('users/login'))
    .post('/users/login', redirectIfLoggedIn, loginUser)
    .get('/users/logout', isLoggedIn, logout)
    .get('/users/profile', isLoggedIn, profileUser)
    .post('/users/profile', isLoggedIn, upload.single('image'), updateProfile)
    .get('/users/forgotPassword', redirectIfLoggedIn, (req, res) => res.render('users/forgotPassword'))
    .post('/users/getPreguntaSeguridad', redirectIfLoggedIn, getPreguntaSeguridad)
    .post('/users/forgotPassword', redirectIfLoggedIn, forgotPassword)
    .get('/users/adminUsers', isAdmin, adminUsers)
    .delete('/users/deleteUsers/:id', isAdmin, deleteUser)
    .get('/users/editUsers/:id', isAdmin, editUser)
    .post('/users/editUsers/:id', isAdmin, upload.single('image'), updateUser)
    .get('/users/errorAdmin', isLoggedIn, (req, res) => {
        res.render('users/errorAdmin');
    });

module.exports = router;