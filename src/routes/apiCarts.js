
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); 

router.get('/api/cart', cartController.getCart);
router.get('/api/cart/item/:id', cartController.addItemToCart);
router.get('/api/cart/empty', cartController.emptyCart);
router.get('/api/cart/item/remove/:id', cartController.removeItemFromCart);

module.exports = router;