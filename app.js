const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Importa los middlewares
const errorLogger = require('./src/middlewares/errorLogger');
const notFoundHandler = require('./src/middlewares/notFoundHandler');
const requestLogger = require('./src/middlewares/requestLogger');
const sessionMiddleware = require('./src/middlewares/sessionMiddleware');
const rememberMeMiddleware = require('./src/middlewares/rememberMeMiddleware'); // Nuevo middleware


const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');

const { filterProducts: myFilterProducts } = require('./src/utils/utils.js');

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
    .set('view engine', 'ejs')

    .use(express.urlencoded({ extended: true })) // Middleware para parsear el body
    .use(methodOverride('_method'))         // Middleware para habilitar PUT y DELETE

    // Middleware de sesión (¡antes de las rutas!)
    .use(sessionMiddleware)

    // Middlewares de la aplicación
    .use(logger('dev'))                     // Middleware para log de requests
    .use(express.json())                    // Middleware para parsear JSON
    .use(cookieParser())                   // Middleware para parsear cookies
    .use(express.static(path.join(__dirname, 'public'))) // Middleware para archivos estáticos
    .use(requestLogger)                     // Middleware para log de requests (nuestro log personalizado)


    // *** Productos destacados y carrusel (Middleware) ***
    .use((req, res, next) => {
        function getFeaturedProducts() {
            const featuredIds = [1, 7, 12, 10, 20];
            return myFilterProducts(app.locals.products, featuredIds);
        }

        app.locals.featuredProducts = getFeaturedProducts;

        function getCarouselProducts() {
            return myFilterProducts(app.locals.products, [1, 7, 12, 10, 20]);
        }

        app.locals.carouselProducts = getCarouselProducts;
        next();
    })

    // Rutas
    .use('/', indexRouter)
    .use('/users', usersRouter)
    .use('/products', productsRouter)

    // Manejo de errores
    .use(notFoundHandler) // Middleware para error 404
    .use(errorLogger);     // Middleware para log de errores

module.exports = app;



