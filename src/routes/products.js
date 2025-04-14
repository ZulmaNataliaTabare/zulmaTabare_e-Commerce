const express = require('express');
const router = express.Router();
const { admin, detail, add, create, edit, remove, update, category, getAllProducts, search } = require('../controllers/productsController');
const { isAdmin, isLoggedIn } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Importa el middleware de Multer
const validateImage = require('../middlewares/validateImageMiddleware');

// Rutas protegidas con isAdmin
router
    .get('/add', isAdmin, add)
    .post('/add', isAdmin, upload.single('image'), validateImage, create) // Usa el middleware de Multer aquí
    .get('/', isAdmin, admin)

// Rutas públicas (sin protección)
    .get('/productDetail/:id', detail)
    .get('/allProducts', getAllProducts)
    .get('/search', search) // Nueva ruta para la búsqueda

// Ruta para categorías
    .get('/category', category)

// Rutas para editar y eliminar (protegidas con isAdmin)
    .get('/edit/:id', isAdmin, edit)
    .put('/edit/:id', isAdmin, upload.single('image'), validateImage, update) // Usa el middleware de Multer aquí
    .delete('/delete/:id', isAdmin, remove)

    // Ruta para errorAdmin.ejs
    .get('/errorAdmin', isLoggedIn, (req, res) => {
        res.render('users/errorAdmin');
    });

// *** UNA SOLA RUTA PARA CATEGORIAS ***
//     .get('/category', (req, res) => {
//     const category = req.query.category;
//     res.render('products/category', { category });
// });

module.exports = router;