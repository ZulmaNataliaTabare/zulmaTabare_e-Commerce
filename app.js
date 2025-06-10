'use strict';

require('dotenv').config(); 

const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const db = require(path.resolve(__dirname, 'src', 'database', 'models')); 

const app = express();


const port = process.env.PORT || 3002;

app.use(cors({ origin: 'http://localhost:5173' }));

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
const apiUsersRouter = require('./src/routes/apiUsers');
const apiProductRoutes = require('./src/routes/apiProducts');
const { filterProducts: myFilterProducts } = require('./src/utils/utils.js');
const apiCartsRouter = require('./src/routes/apiCarts');

// Cargar productos desde products.json
const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
let products = [];
try {
    products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    app.locals.products = products;
} catch (err) {
    console.error('Error al cargar el archivo de productos:', err);
    
}

// Configuración de vistas y assets estáticos
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
    .use(requestLogger);

// Middleware para productos destacados y carrusel
app.use((req, res, next) => {
    function getFeaturedProducts() {
        const featuredIds = [1, 7, 12, 10, 20];
        
        return myFilterProducts(app.locals.products || [], featuredIds);
    }

    app.locals.featuredProducts = getFeaturedProducts;

    function getCarouselProducts() {
        return myFilterProducts(app.locals.products || [], [1, 7, 12, 10, 20]);
    }

    app.locals.carouselProducts = getCarouselProducts;
    next();
});

// Rutas
app
    .use('/api/users', apiUsersRouter)
    .use('/api/products', apiProductRoutes)
    .use('/', indexRouter)
    .use('/', usersRouter)
    .use('/products', productsRouter)
    .use('/api/cart', apiCartsRouter);

// Middlewares de manejo de errores (siempre al final de las rutas)
app
    .use(errorLogger)
    .use(adminErrorHandler)
    .use(errorHandler)
    .use(notFoundHandler);

module.exports = { app, db};
