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
const { body, validationResult } = require('express-validator'); // Importa express-validator
const db = require('../database/models'); // Importa el modelo de usuario
const validateImage = require('../middlewares/validateImageMiddleware'); // Importa el middleware de validación de imagen 

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
    .post('/users/register', 
        redirectIfLoggedIn, 
        upload.single('image'), 
        validateImage, // Middleware para validar la imagen
        [
            body('first_name')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
            body('last_name')
                .notEmpty().withMessage('El apellido es obligatorio')
                .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
            body('email')
                .notEmpty().withMessage('El email es obligatorio')
                .isEmail().withMessage('El email debe tener un formato válido')
                .custom(async (value, { req }) => {
                    const user = await db.User.findOne({ where: { email: value } });
                    const userId = parseInt(req.params.id);
                    if (user && user.user_id !== userId) {
                        throw new Error('El email ya está registrado');
                    }
                    return true;
                }),
            body('user_password')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
        ],
        registerUser
    )
    .get('/users/cart', isLoggedIn, (req, res) => res.render('users/cart'))
    .get('/users/login', redirectIfLoggedIn, (req, res) => res.render('users/login'))
    .post('/users/login', 
        redirectIfLoggedIn, 
        [
            body('usuario')
                .notEmpty().withMessage('El mail o nombre de usuario es obligatorio')
                .custom(async (value) => {
                    const user = await db.User.findOne({ 
                        where: { 
                            [Op.or]: [{ user_name: value }, { email: value }] 
                        }
                    });
                    if (!user) {
                        throw new Error('El usuario no existe');
                    }
                    req.userToCheck = user;
                    return true;
                }),


            body('constrasena')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .custom(async (value, { req }) => {
                    if (!req.userToCheck) {
                        return true; // Si no hay usuario para verificar, no se puede validar la contraseña
                    }
                    const passwordMatch = await bcrypt.compare(value, req.userToCheck.user_password);
                    if (!passwordMatch) {
                        throw new Error('La contraseña es incorrecta');
                    }
                    return true;
                }),
        ],
        loginUser
    )
    .get('/users/logout', isLoggedIn, logout)
    .get('/users/profile', isLoggedIn, profileUser)
    .post('/users/profile', 
        isLoggedIn, 
        upload.single('image'), 
        validateImage, // Middleware para validar la imagen
        [    
        body('first_name')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
            body('last_name')
                .notEmpty().withMessage('El apellido es obligatorio')
                .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
            body('email')
                .notEmpty().withMessage('El email es obligatorio')
                .isEmail().withMessage('El email debe tener un formato válido')
                .custom(async (value, { req }) => {
                    const user = await db.User.findOne({ where: { email: value } });
                    const userId = parseInt(req.params.id);
                    if (user && user.user_id !== userId) {
                        throw new Error('El email ya está registrado');
                    }
                    return true;
                }),
            body('password')
                .if(body('password').notEmpty())
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
            ],
            updateProfile
    )
    .get('/users/forgotPassword', redirectIfLoggedIn, (req, res) => res.render('users/forgotPassword'))
    .post('/users/getPreguntaSeguridad', redirectIfLoggedIn, getPreguntaSeguridad)
    .post('/users/forgotPassword', redirectIfLoggedIn, forgotPassword)
    .get('/users/adminUsers', isAdmin, adminUsers)
    .delete('/users/deleteUsers/:id', isAdmin, deleteUser)
    .get('/users/editUsers/:id', isAdmin, editUser)
    .post('/users/editUsers/:id', 
        isAdmin, 
        upload.single('image'), 
        validateImage, // Middleware para validar la imagen
        [
            body('first_name')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
            body('last_name')
                .notEmpty().withMessage('El apellido es obligatorio')
                .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
            body('email')
                .notEmpty().withMessage('El email es obligatorio')
                .isEmail().withMessage('El email debe tener un formato válido')
                .custom(async (value, { req }) => {
                    const user = await db.User.findOne({ where: { email: value } });
                    const userId = parseInt(req.params.id);
                    if (user && user.user_id !== userId) {
                        throw new Error('El email ya está registrado');
                    }
                    return true;
                }),
            body('password')
                .if(body('password').notEmpty())
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
            body('rol_id')
                .notEmpty().withMessage('El rol es obligatorio')
                .isInt({ min: 1 }).withMessage('El rol debe ser un número entero positivo')
                .custom(async (value, { req }) => {
                    const rol = await db.Rol.findByPk(value);
                    if (!rol) {
                        throw new Error('El rol seleccionado no es válido ');
                    }
                    return true;
                }),
            ],
        updateUser
    )
    .get('/users/errorAdmin', isLoggedIn, (req, res) => {
        res.render('users/errorAdmin');
    });

module.exports = router;