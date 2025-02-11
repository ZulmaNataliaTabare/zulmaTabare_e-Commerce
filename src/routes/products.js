
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


// *** UNA SOLA RUTA PARA CATEGORIAS ***
router.get('/category', (req, res) => {
    const category = req.query.category; // Obtener la categoría del query string
    res.render('products/category', { category });
});


module.exports = router;