
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, profileUser, logout, updateProfile, getPreguntaSeguridad, forgotPassword, adminUsers, deleteUser, editUser, updateUser } = require('../controllers/userController');
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
.post('/users/register', upload.single('image'), registerUser)
.get('/users/register', redirectIfLoggedIn, (req, res) => res.render('users/register'))
.post('/users/register', redirectIfLoggedIn, registerUser)
.get('/users/cart', authMiddleware.isLoggedIn, (req, res) => res.render('users/cart'))
.get('/users/login', redirectIfLoggedIn, (req, res) => res.render('users/login'))
.post('/users/login', redirectIfLoggedIn, loginUser)
.get('/users/logout', authMiddleware.isLoggedIn, logout)
.get('/users/profile', authMiddleware.isLoggedIn, profileUser)
.post('/users/profile', authMiddleware.isLoggedIn, upload.single('image'), updateProfile)
.get('/users/forgotPassword', redirectIfLoggedIn, (req, res) => res.render('users/forgotPassword'))
.post('/users/getPreguntaSeguridad', redirectIfLoggedIn, getPreguntaSeguridad)
.post('/users/forgotPassword', redirectIfLoggedIn, forgotPassword)
.get('/users/adminUsers', authMiddleware.isAdmin, adminUsers) 
.delete('/adminUsers/delete/:id', authMiddleware.isAdmin, deleteUser) 
.get('/users/editUsers/:id', authMiddleware.isAdmin, editUser) 
.post('/users/editUsers/:id', authMiddleware.isAdmin, upload.single('image'), updateUser); 
    
    
    
    
    module.exports = router;