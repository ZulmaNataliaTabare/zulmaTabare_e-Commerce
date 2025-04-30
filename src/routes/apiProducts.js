const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); 


router
        .get('/products/', productsController.getProductsAPI)
        .get('/products/:id', productsController.getProductDetailAPI);

module.exports = router;