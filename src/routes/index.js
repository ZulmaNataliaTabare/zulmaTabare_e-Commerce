const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);

// Función para obtener tres productos aleatorios (se mantiene igual)
const getRandomProducts = (products, num) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

router.get('/', (req, res) => {
    const products = req.app.locals.products; // Obtén products desde app.locals
    const carouselItems = req.app.locals.carouselProducts(); // Obtén carouselItems
    const randomProducts = getRandomProducts(products, 3); // Llama a getRandomProducts *aquí*
    res.render('index', { title: 'Inicio', products: randomProducts, carouselItems }); // Pasa randomProducts a la vista
});


// Rutas para "Registro", "Login" y "Carrito" (se mantienen igual)
router.get('/register', (req, res) => {
    res.render('users/register', { title: 'Registro' });
});

router.get('/login', (req, res) => {
    res.render('users/login', { title: 'Login' });
});

router.get('/cart', (req, res) => {
    res.render('users/cart', { title: 'Carrito' });
});

module.exports = router;