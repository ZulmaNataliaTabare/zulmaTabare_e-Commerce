const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // ImportO la función registerUser
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'), // Ruta relativa a public/uploads
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // IncluyO la extensión
    }
});

const upload = multer({ storage: storage });

router
    .post('/register', upload.single('image'), registerUser) // Ruta POST para el registro
    .get('/login', (req, res) => { res.render('users/login');}) // Ruta GET para el formulario de login
    .post('/login', loginUser); // Ruta POST para el login


module.exports = router;