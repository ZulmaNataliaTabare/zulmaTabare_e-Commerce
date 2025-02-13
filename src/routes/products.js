const express = require('express');
const router = express.Router();
const { admin, detail, add, create, edit, remove, update, category, getAllProducts } = require('../controllers/productsController');
const productsController = require('../controllers/productsController'); 

const multer = require('multer');
const path = require('path'); // Importa el módulo path

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'), // Ruta relativa a public/uploads
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Incluye la extensión del archivo
    }
});

const upload = multer({ storage: storage });



router
    .get('/', admin)
    .get('/detail/:id', detail)
    .get('/add', add)
    .post('/add', upload.single('image'), create)
    .get('/edit/:id', edit)
    .put('/edit/:id', upload.single('image'), update) 
    .delete('/delete/:id', remove)
    .get('/category', category)
    .get('/allProducts', getAllProducts);

// *** UNA SOLA RUTA PARA CATEGORIAS ***
router.get('/category', (req, res) => {
    const category = req.query.category;
    res.render('products/category', { category });
});

module.exports = router;