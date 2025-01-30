
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); // Importa el controlador correcto

router.get('/add', productsController.addForm);
router.post('/add', productsController.create);
router.get('/edit/:id', productsController.editForm);
router.post('/edit/:id', productsController.update);
router.get('/admin', productsController.admin);
router.post('/delete/:id', productsController.delete);
router.get('/product/:id', productsController.getProductDetail);

module.exports = router;
