
const { filterProducts } = require('../utils/utils.js');
const express = require('express');
const { admin, detail, add, create, edit, remove, update } = require('../controllers/productsController');
const router = express.Router();


router
    .get('/', admin)
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add', create)
    .get('/edit/:id', edit)
    .put('/edit/:id', update)
    .delete('/delete/:id', remove);


    // Rutas para categorías
router.get('/accesorios', (req, res) => {
    const filteredProducts = filterProducts(req.app.locals.products, [8, 9, 10, 11]); 
    res.render('products/category', { category: 'Accesorios', products: filteredProducts });
});

router.get('/ambos', (req, res) => {
    const filteredProducts = filterProducts(req.app.locals.products, [1, 2, 3, 4]); 
    res.render('products/category', { category: 'Ambos', products: filteredProducts });
});

router.get('/zuecos', (req, res) => {
    const filteredProducts = filterProducts(req.app.locals.products, [12, 13, 14, 15]); 
    res.render('products/category', { category: 'Zuecos', products: filteredProducts });
});

router.get('/lanyard', (req, res) => {
    const filteredProducts = filterProducts(req.app.locals.products, [5, 6, 7]); 
    res.render('products/category', { category: 'Lanyard', products: filteredProducts });
});

router.get('/anotadores', (req, res) => {
    const filteredProducts = filterProducts(req.app.locals.products, [16, 17, 18, 19]); 
    res.render('products/category', { category: 'Anotadores', products: filteredProducts });
});

router.get('/bazar', (req, res) => {
    const filteredProducts = filterProducts(req.app.locals.products, [20, 21, 22, 23]); 
    res.render('products/category', { category: 'Bazar', products: filteredProducts });
});

module.exports = router;