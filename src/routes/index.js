const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/users', userController.getAllUsers);

// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// Ruta para la página de "Registro"
router.get('/register', (req, res) => {
  res.render('users/register', { title: 'Registro' });
});

// Ruta para la página de "Login"
router.get('/login', (req, res) => {
  res.render('users/login', { title: 'Login' });
});

// Ruta para la página de "Cart"
router.get('/cart', (req, res) => {
  res.render('users/cart', { title: 'Carrito' });
});

module.exports = router;
