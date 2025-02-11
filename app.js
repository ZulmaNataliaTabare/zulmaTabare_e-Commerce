require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');


const { filterProducts: myFilterProducts } = require('./src/utils/utils.js');

// Cargar productos desde el archivo JSON (SIN CAMBIOS)
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

// *** Productos destacados ***
function getFeaturedProducts() { // No recibe 'products' como argumento
    const featuredIds = [1, 7, 12, 10, 20];
    return myFilterProducts(app.locals.products, featuredIds); // Usar app.locals.products
}

app.locals.featuredProducts = getFeaturedProducts; // Asignar la función directamente

// *** Productos para el carrusel ***
function getCarouselProducts() { // No recibe 'products' como argumento
    return myFilterProducts(app.locals.products, [1, 7, 12, 10, 20]); // Usar app.locals.products
}

app.locals.carouselProducts = getCarouselProducts; // Asignar la función directamente


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
    .use('/products', productsRouter)

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



