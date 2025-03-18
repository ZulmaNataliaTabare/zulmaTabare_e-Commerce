const express = require('express');
const router = express.Router();
const { admin, detail, add, create, edit, remove, update, category, getAllProducts } = require('../controllers/productsController');
const productsController = require('../controllers/productsController'); 
const { isAdmin, isLoggedIn } = require('../middlewares/authMiddleware');

const multer = require('multer');
const path = require('path'); // Importa el módulo path

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'), // Ruta relativa a public/uploads
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Genera un nombre único para el archivo
    }
});

const upload = multer({ storage: storage });



// Rutas protegidas con isAdmin
router
        .get('/add', isAdmin, add)
        .post('/add', isAdmin, upload.single('image'), create)
        .get('/', isAdmin, admin) 

// Rutas públicas (sin protección)
        .get('/detail/:id', detail)
        .get('/allProducts', getAllProducts)

// Ruta para categorías 
    .get('/category', productsController.category)

// Rutas para editar y eliminar (protegidas con isAdmin)
    .get('/edit/:id', isAdmin, edit)
    .put('/edit/:id', isAdmin, upload.single('image'), update)
    .delete('/delete/:id', isAdmin, remove)

    // Ruta para errorAdmin.ejs
    .get('/errorAdmin', isLoggedIn, (req, res) => {
    res.render('users/errorAdmin');
})


// *** UNA SOLA RUTA PARA CATEGORIAS ***
//     .get('/category', (req, res) => {
//     const category = req.query.category_id;
//     res.render('products/category', { category_id: category });
// });

module.exports = router;
