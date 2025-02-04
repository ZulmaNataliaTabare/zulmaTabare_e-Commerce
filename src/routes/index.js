const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router
  .get('/users', userController.getAllUsers)

// Ruta para la página de inicio

  .get('/', (req, res) => {
    const products = req.app.locals.products

    // Seleccionar tres productos aleatorios
    const getRandomProducts = (products, num) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const randomProducts = getRandomProducts(products, 3);

    res.render('index', { title: 'Inicio', products: randomProducts });
});

// Ruta para la página de "Registro"
router
    .get('/register', (req, res) => {
  res.render('users/register', { title: 'Registro' });
})

// Ruta para la página de "Login"
    .get('/login', (req, res) => {
  res.render('users/login', { title: 'Login' });
})

// Ruta para la página de "Cart"
    .get('/cart', (req, res) => {
  res.render('users/cart', { title: 'Carrito' });
});

module.exports = router;
