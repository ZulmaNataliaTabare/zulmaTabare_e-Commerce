require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Importar rutas
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users'); // Ruta para users.js

var app = express();

// Configuración del motor de plantillas
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos una vez
app.use((req, res, next) => {
  console.log(`Archivo solicitado: ${req.originalUrl}`);
  next();
});

// Middleware y rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', usersRouter); // Asegúrate de usar el nombre correcto

// Captura 404 y redirecciona al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Usar un puerto desde la variable de entorno o 3001 por defecto
const port = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;

