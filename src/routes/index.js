const express = require('express');
const router = express.Router();
// const {productsController}=require('./products');
// const {products}=productsController;
// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// Ruta para la página de "Ambos"
router.get('/ambos', (req, res) => {
  res.render('ambos', { title: 'Ambos' });
});

// router.get('/:producto',producto(req, res,next));
// router.get('/:producto', console.log(products));


// Añadir otras rutas aquí...
router.get('/zuecos', (req, res) => {
  res.render('zuecos', { title: 'Zuecos' });
});

// Más rutas según sea necesario...

module.exports = router;
