const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); 


router
        .get('/', productsController.getProductsAPI)
        .get('/categories/countByCategories', productsController.getProductsCountByCategoriesAPI)
        .get('/categories/count', productsController.getTotalCategoriesCountAPI)
        .get('/:id', productsController.getProductDetailAPI);
        


module.exports = router;