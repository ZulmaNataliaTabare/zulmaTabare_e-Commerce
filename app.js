require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const { filterProducts: myFilterProducts } = require('./src/utils/utils.js');


const filterProducts = (ids) => myFilterProducts(app.locals.products, ids);

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');

// Cargar productos desde el archivo JSON
const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
let products = [];
try {
    products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    app.locals.products = products;
} catch (err) {
    console.error('Error al cargar el archivo de productos:', err);
}


app
    .set('views', path.join(__dirname, 'src', 'views'))
    .set('view engine', 'ejs');

// Función para filtrar productos para el carrusel
const carouselProducts = () => filterProducts([1, 7, 12, 10, 20]); 
app.locals.carouselProducts = carouselProducts;


app
    .use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))

    .use((req, res, next) => {
        console.log(`Archivo solicitado: ${req.originalUrl}`);
        next();
    })

    // Rutas principales
    .use('/', indexRouter)
    .use('/users', usersRouter)
    .use('/products', productsRouter) // Configuración de la ruta de productos

    // Manejo de errores 404
    .use((req, res, next) => {
        next(createError(404));
    })

    // Manejo de otros errores
    .use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    });

    module.exports = app; 