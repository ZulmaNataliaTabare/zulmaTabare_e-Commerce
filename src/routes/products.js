const express = require('express');
const router = express.Router();
const { admin, detail, add, create, edit, remove, update, category } = require('../controllers/productsController');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
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
    .get('/category', category);

// *** UNA SOLA RUTA PARA CATEGORIAS ***
router.get('/category', (req, res) => {
    const category = req.query.category;
    res.render('products/category', { category });
});

module.exports = router;