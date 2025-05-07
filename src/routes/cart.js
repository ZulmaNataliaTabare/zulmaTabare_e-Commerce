const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');


router.post('/add/:id', cartController.addToCart);

module.exports = router;