const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Ruta para obtener todos los usuarios
router.get('/users', userController.getAllUsers);


// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// Ruta para la página de "Ambos"
router.get('/ambos', (req, res) => {
  res.render('products/ambos', { title: 'Ambos' });
});

router.get('/elleganceFire', (req, res) => {
  res.render('products/elleganceFire', { title: 'Ellegance-Fire' });
});


router.get('/blusonMariquitas', (req, res) => {
  res.render('products/blusonMariquitas', { title: 'Bluson-Mariquitas' });
});

router.get('/blusonUnisex', (req, res) => {
  res.render('products/blusonUnisex', { title: 'Bluson-Unisex' });
});

router.get('/guardapolvo', (req, res) => {
  res.render('products/guardapolvo', { title: 'guardapolvo' });
});
// router.get('/:producto',producto(req, res,next));
// router.get('/:producto', console.log(products));


// Ruta para la página de "Zuecos"

router.get('/zuecos', (req, res) => {
  res.render('products/zuecos', { title: 'Zuecos' });
});

router.get('/zuecoColorful', (req, res) => {
  res.render('products/zuecoColorful', { title: 'zuecoColorful' });
});


router.get('/zuecoVelcro', (req, res) => {
  res.render('products/zuecoVelcro', { title: 'zuecoVelcro' });
});

router.get('/zuecoLavable', (req, res) => {
  res.render('products/zuecoLavable', { title: 'zuecoLavable' });
});

router.get('/zuecoAntiestatico', (req, res) => {
  res.render('products/zuecoAntiestatico', { title: 'zuecoAntiestatico' });
});

// Ruta para la página de "Lanyard"

router.get('/lanyard', (req, res) => {
  res.render('products/lanyard', { title: 'lanyard' });
});

router.get('/lanyardHospi', (req, res) => {
  res.render('products/lanyardHospi', { title: 'lanyardHospi' });
});


router.get('/lanyardHappiness', (req, res) => {
  res.render('products/lanyardHappiness', { title: 'lanyardHappiness' });
});

router.get('/lanyardEnfermeria', (req, res) => {
  res.render('products/lanyardEnfermeria', { title: 'lanyardEnfermeria' });
});

router.get('/lanyardPrincipal', (req, res) => {
  res.render('products/lanyardPrincipal', { title: 'lanyardPrincipal' });
});

// Ruta para la página de "Anotadores"

router.get('/anotadores', (req, res) => {
  res.render('products/anotadores', { title: 'anotadores' });
});

router.get('/anotadorMotiva', (req, res) => {
  res.render('products/anotadorMotiva', { title: 'anotadorMotiva' });
});


router.get('/anotadorCuidar', (req, res) => {
  res.render('products/anotadorCuidar', { title: 'anotadorCuidar' });
});

router.get('/anotadorCoolCoco', (req, res) => {
  res.render('products/anotadorCoolCoco', { title: 'anotadorCoolCoco' });
});

router.get('/anotadorValiente', (req, res) => {
  res.render('products/anotadorValiente', { title: 'anotadorValiente' });
});

// Ruta para la página de "Accesorios"

router.get('/accesorios', (req, res) => {
  res.render('products/accesorios', { title: 'accesorios' });
});

router.get('/accesoriosTijera', (req, res) => {
  res.render('products/accesoriosTijera', { title: 'accesoriosTijera' });
});


router.get('/accesoriosCompresor', (req, res) => {
  res.render('products/accesoriosCompresor', { title: 'accesoriosCompresor' });
});

router.get('/accesoriosSalvabolsillo', (req, res) => {
  res.render('products/accesoriosSalvabolsillo', { title: 'accesoriosSalvabolsillo' });
});

router.get('/accesoriosScrunchies', (req, res) => {
  res.render('products/accesoriosScrunchies', { title: 'accesoriosScrunchies' });
});

// Ruta para la página de "Bazar"

router.get('/bazar', (req, res) => {
  res.render('products/bazar', { title: 'bazar' });
});

router.get('/bazarCorazon', (req, res) => {
  res.render('products/bazarCorazon', { title: 'bazarCorazon' });
});


router.get('/bazarOftal', (req, res) => {
  res.render('products/bazarOftal', { title: 'bazarOftal' });
});

router.get('/bazarCamillero', (req, res) => {
  res.render('products/bazarCamillero', { title: 'bazarCamillero' });
});

router.get('/bazarPediatria', (req, res) => {
  res.render('bazarPediatria', { title: 'bazarPediatria' });
});

// Ruta para la página de "Registro"
router.get('/register', (req, res) => {
  res.render('users/register', { title: 'register' });
});


router.get('/example', (req, res) => {
    res.send('Ejemplo de ruta');
});

// Ruta para la página de "Login"
router.get('/login', (req, res) => {
  res.render('users/login', { title: 'login' });
});

// Ruta para la página de "Cart"
router.get('/cart', (req, res) => {
  res.render('users/cart', { title: 'Carrito' });
});

module.exports = router;
