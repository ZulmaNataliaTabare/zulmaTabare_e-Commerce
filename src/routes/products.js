var express = require('express');
const {admin, detail, add, create, edit, remove, update } = require('../controllers/productsController'); // Importa el controlador correcto
var router = express.Router();

// Definí la ruta y el método que se debe ejecutar en cada caso
router
    .get('/admin', admin)
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add', create)
    .get('/edit/:id', edit)
    .put('/edit/:id', update)
    .delete('/delete/:id', remove);

module.exports = router;

