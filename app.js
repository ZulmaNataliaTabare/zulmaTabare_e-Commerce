require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const port = process.env.PORT || 3002;
app.set('port', port);




// Importa los middlewares
const errorLogger = require('./src/middlewares/errorLogger');
const adminErrorHandler = require('./src/middlewares/adminErrorHandler');
const errorHandler = require('./src/middlewares/errorHandler');
const notFoundHandler = require('./src/middlewares/notFoundHandler');
const requestLogger = require('./src/middlewares/requestLogger');
const sessionMiddleware = require('./src/middlewares/sessionMiddleware');
const rememberMeMiddleware = require('./src/middlewares/rememberMeMiddleware');
const checkUserSession = require('./src/middlewares/checkUserSession');

// Importa las rutas
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');

const { filterProducts: myFilterProducts } = require('./src/utils/utils.js');

// Cargar productos
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

    .use(express.static(path.join(__dirname, 'public')))
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(methodOverride('_method'))
.use(cookieParser())
.use(sessionMiddleware)
.use(rememberMeMiddleware)
.use(checkUserSession)
.use(logger('dev'))
.use(requestLogger)

    // Middleware para productos destacados y carrusel
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
    .use('/', usersRouter)
    .use('/products', productsRouter)

    // Middlewares de manejo de errores 
    .use(errorLogger)
    .use(adminErrorHandler)
    .use(errorHandler)
    .use(notFoundHandler)


module.exports = app;