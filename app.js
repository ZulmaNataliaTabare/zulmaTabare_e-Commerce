require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products');

var app = express(); // Inicializar 'app' antes de definir las rutas

// Cargar productos desde el archivo JSON
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.json'), 'utf-8'));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Ruta para accesorios
app.get('/accesorios', (req, res) => {
  const filteredProducts = products.filter(product => [8, 9, 10, 11].includes(product.id));
  console.log(filteredProducts); // Verifica si los datos se cargan correctamente
  res.render('products/category', { category: 'Accesorios', products: filteredProducts });
});

// Ruta para ambos
app.get('/ambos', (req, res) => {
  const filteredProducts = products.filter(product => [1, 2, 3, 4].includes(product.id));
  console.log(filteredProducts); // Verifica si los datos se cargan correctamente
  res.render('products/category', { category: 'Ambos', products: filteredProducts });
});


// Ruta para zuecos
app.get('/zuecos', (req, res) => {
  const filteredProducts = products.filter(product => [12, 13, 14, 15].includes(product.id));
  res.render('products/category', { category: 'Zuecos', products: filteredProducts });
});

// Ruta para lanyard
app.get('/lanyard', (req, res) => {
  const filteredProducts = products.filter(product => [5, 6, 7].includes(product.id));
  res.render('products/category', { category: 'Lanyard', products: filteredProducts });
});

// Ruta para anotadores
app.get('/anotadores', (req, res) => {
  const filteredProducts = products.filter(product => [16, 17, 18, 19].includes(product.id));
  res.render('products/category', { category: 'Anotadores', products: filteredProducts });
});

// Ruta para bazar
app.get('/bazar', (req, res) => {
  const filteredProducts = products.filter(product => [20, 21, 22, 23].includes(product.id));
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



// Ruta específica para agregar productos (opcional, ya definida en productsRouter)
app.get('/product/add', (req, res) => {
  res.render('products/productAdd');
});

// Ruta para detalles de productos
app.get('/products/product/:id', (req, res) => {
  const productId = req.params.id;
  const productDetails = products.find(product => product.id === parseInt(productId)); // Encuentra el producto
  if (productDetails) {
    res.render('products/productDetail', { product: productDetails });
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Manejo de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejo de otros errores
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
