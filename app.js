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

// Temporalmente desactivado: Conectar a mongoose /*
// Conectar a mongoose
// const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://sulmatabare:<SulmaTabare1>@cluster0.hbhxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0I';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Integrar las rutas de usuarios
app.use('/api', usersRouter); // Asegúrate de usar el nombre correcto

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

module.exports = app;
