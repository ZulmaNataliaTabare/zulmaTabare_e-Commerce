// const express = require('express');
// const router = express.Router();
// const {detail,all,producto} = require('../controllers/productsController')

// router.get('/',all);
// router.get('/:producto',producto)
// router.get('/:id/detail',detail);


// module.exports = router;

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas para agregar y editar productos
router.get('/add', productsController.addForm);
router.post('/add', productsController.create);
router.get('/edit/:id', productsController.editForm);
router.post('/edit/:id', productsController.update);

// Vista de administración
router.get('/admin', productsController.admin);

// Eliminar producto
router.post('/delete/:id', productsController.delete);

module.exports = router;
