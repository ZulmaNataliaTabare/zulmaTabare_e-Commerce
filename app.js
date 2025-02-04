require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');

const app = express(); // Inicializar 'app' antes de definir las rutas

// Cargar productos desde el archivo JSON
const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
let products = [];
try {
    products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    app.locals.products = products;
} catch (err) {
    console.error('Error al cargar el archivo de productos:', err);
}

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Función auxiliar para filtrar productos
const filterProducts = (ids) => products.filter(product => ids.includes(product.id));

// Ruta para accesorios
app.get('/accesorios', (req, res) => {
    const filteredProducts = filterProducts([8, 9, 10, 11]);
    console.log(filteredProducts); // Verifica si los datos se cargan correctamente
    res.render('products/category', { category: 'Accesorios', products: filteredProducts });
});

// Ruta para ambos
app.get('/ambos', (req, res) => {
    const filteredProducts = filterProducts([1, 2, 3, 4]);
    console.log(filteredProducts); // Verifica si los datos se cargan correctamente
    res.render('products/category', { category: 'Ambos', products: filteredProducts });
});

// Ruta para zuecos
app.get('/zuecos', (req, res) => {
    const filteredProducts = filterProducts([12, 13, 14, 15]);
    res.render('products/category', { category: 'Zuecos', products: filteredProducts });
});

// Ruta para lanyard
app.get('/lanyard', (req, res) => {
    const filteredProducts = filterProducts([5, 6, 7]);
    res.render('products/category', { category: 'Lanyard', products: filteredProducts });
});

// Ruta para anotadores
app.get('/anotadores', (req, res) => {
    const filteredProducts = filterProducts([16, 17, 18, 19]);
    res.render('products/category', { category: 'Anotadores', products: filteredProducts });
});

// Ruta para bazar
app.get('/bazar', (req, res) => {
    const filteredProducts = filterProducts([20, 21, 22, 23]);
    res.render('products/category', { category: 'Bazar', products: filteredProducts });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Archivo solicitado: ${req.originalUrl}`);
    next();
});

// Rutas principales
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Configuración de la ruta de productos

// Manejo de errores 404
app.use((req, res, next) => {
    next(createError(404));
});

// Manejo de otros errores
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
