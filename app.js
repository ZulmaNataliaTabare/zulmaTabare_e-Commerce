require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Importar rutas
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products'); // Nueva ruta para productos

var app = express();

// Configuración del motor de plantillas
app.set('views', path.join(__dirname, 'src/views')); // Carpeta de vistas
app.set('view engine', 'ejs'); // Motor de vistas EJS

// Middlewares globales
app.use(logger('dev')); // Logger para las solicitudes
app.use(express.json()); // Manejo de JSON
app.use(express.urlencoded({ extended: true })); // Manejo de formularios
app.use(cookieParser()); // Manejo de cookies
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// Middleware personalizado para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Archivo solicitado: ${req.originalUrl}`);
  next();
});

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Configuración de la ruta de productos

// Captura de 404 y manejo de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Puerto
const port = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;


