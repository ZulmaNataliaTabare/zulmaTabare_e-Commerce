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
  res.render('ambos', { title: 'Ambos' });
});

router.get('/elleganceFire', (req, res) => {
  res.render('elleganceFire', { title: 'Ellegance-Fire' });
});


router.get('/blusonMariquitas', (req, res) => {
  res.render('blusonMariquitas', { title: 'Bluson-Mariquitas' });
});

router.get('/blusonUnisex', (req, res) => {
  res.render('blusonUnisex', { title: 'Bluson-Unisex' });
});

router.get('/guardapolvo', (req, res) => {
  res.render('guardapolvo', { title: 'guardapolvo' });
});
// router.get('/:producto',producto(req, res,next));
// router.get('/:producto', console.log(products));


// Ruta para la página de "Zuecos"

router.get('/zuecos', (req, res) => {
  res.render('zuecos', { title: 'Zuecos' });
});

router.get('/zuecoColorful', (req, res) => {
  res.render('zuecoColorful', { title: 'zuecoColorful' });
});


router.get('/zuecoVelcro', (req, res) => {
  res.render('zuecoVelcro', { title: 'zuecoVelcro' });
});

router.get('/zuecoLavable', (req, res) => {
  res.render('zuecoLavable', { title: 'zuecoLavable' });
});

router.get('/zuecoAntiestatico', (req, res) => {
  res.render('zuecoAntiestatico', { title: 'zuecoAntiestatico' });
});

// Ruta para la página de "Lanyard"

router.get('/lanyard', (req, res) => {
  res.render('lanyard', { title: 'lanyard' });
});

router.get('/lanyardHospi', (req, res) => {
  res.render('lanyardHospi', { title: 'lanyardHospi' });
});


router.get('/lanyardHappiness', (req, res) => {
  res.render('lanyardHappiness', { title: 'lanyardHappiness' });
});

router.get('/lanyardEnfermeria', (req, res) => {
  res.render('lanyardEnfermeria', { title: 'lanyardEnfermeria' });
});

router.get('/lanyardPrincipal', (req, res) => {
  res.render('lanyardPrincipal', { title: 'lanyardPrincipal' });
});

// Ruta para la página de "Anotadores"

router.get('/anotadores', (req, res) => {
  res.render('anotadores', { title: 'anotadores' });
});

router.get('/anotadorMotiva', (req, res) => {
  res.render('anotadorMotiva', { title: 'anotadorMotiva' });
});


router.get('/anotadorCuidar', (req, res) => {
  res.render('anotadorCuidar', { title: 'anotadorCuidar' });
});

router.get('/anotadorCoolCoco', (req, res) => {
  res.render('anotadorCoolCoco', { title: 'anotadorCoolCoco' });
});

router.get('/anotadorValiente', (req, res) => {
  res.render('anotadorValiente', { title: 'anotadorValiente' });
});

// Ruta para la página de "Accesorios"

router.get('/accesorios', (req, res) => {
  res.render('accesorios', { title: 'accesorios' });
});

router.get('/accesoriosTijera', (req, res) => {
  res.render('accesoriosTijera', { title: 'accesoriosTijera' });
});


router.get('/accesoriosCompresor', (req, res) => {
  res.render('accesoriosCompresor', { title: 'accesoriosCompresor' });
});

router.get('/accesoriosSalvabolsillo', (req, res) => {
  res.render('accesoriosSalvabolsillo', { title: 'accesoriosSalvabolsillo' });
});

router.get('/accesoriosScrunchies', (req, res) => {
  res.render('accesoriosScrunchies', { title: 'accesoriosScrunchies' });
});

// Ruta para la página de "Bazar"

router.get('/bazar', (req, res) => {
  res.render('bazar', { title: 'bazar' });
});

router.get('/bazarCorazon', (req, res) => {
  res.render('bazarCorazon', { title: 'bazarCorazon' });
});


router.get('/bazarOftal', (req, res) => {
  res.render('bazarOftal', { title: 'bazarOftal' });
});

router.get('/bazarCamillero', (req, res) => {
  res.render('bazarCamillero', { title: 'bazarCamillero' });
});

router.get('/bazarPediatria', (req, res) => {
  res.render('bazarPediatria', { title: 'bazarPediatria' });
});

// Ruta para la página de "Registro"
router.get('/register', (req, res) => {
  res.render('register', { title: 'register' });
});


router.get('/example', (req, res) => {
    res.send('Ejemplo de ruta');
});

// Ruta para la página de "Login"
router.get('/login', (req, res) => {
  res.render('login', { title: 'login' });
});

module.exports = router;
