'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const db = require(path.resolve(__dirname, 'src', 'database', 'models'));

const app = express();

const port = process.env.PORT || 3002;

app.use(cors({ origin: 'http://localhost:5173' }));

const errorLogger = require('./src/middlewares/errorLogger');
const adminErrorHandler = require('./src/middlewares/adminErrorHandler');
const errorHandler = require('./src/middlewares/errorHandler');
const notFoundHandler = require('./src/middlewares/notFoundHandler');
const requestLogger = require('./src/middlewares/requestLogger');
const sessionMiddleware = require('./src/middlewares/sessionMiddleware');
const rememberMeMiddleware = require('./src/middlewares/rememberMeMiddleware');
const checkUserSession = require('./src/middlewares/checkUserSession');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');
const apiUsersRouter = require('./src/routes/apiUsers');
const apiProductRoutes = require('./src/routes/apiProducts');
const { filterProducts: myFilterProducts } = require('./src/utils/utils.js');
const apiCartsRouter = require('./src/routes/apiCarts');

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
    .use(requestLogger);

// --- CONFIGURACIÓN PARA SERVIR EL DASHBOARD FRONTEND ---
// Esta es la ruta corregida basada en tu estructura de carpetas
// Asume que la carpeta 'dist' del frontend ya fue copiada dentro de 'public/dashboard'
const dashboardServingPath = path.join(__dirname, 'public', 'dashboard');

// Sirve los archivos estáticos del dashboard bajo la ruta '/dashboard'
// Por ejemplo, `https://your-app.railway.app/dashboard/`
app.use('/dashboard', express.static(dashboardServingPath));

// Para manejar el enrutamiento del lado del cliente en el dashboard (ej. React Router)
// Esto asegura que al recargar una ruta como /dashboard/users, el servidor devuelva el index.html del dashboard
app.get('/dashboard/*', (req, res) => {
  res.sendFile(path.join(dashboardServingPath, 'index.html'));
});
// --- FIN CONFIGURACIÓN DASHBOARD ---


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

app
    .use('/api/users', apiUsersRouter)
    .use('/api/products', apiProductRoutes)
    .use('/', indexRouter)
    .use('/', usersRouter)
    .use('/products', productsRouter)
    .use('/api/cart', apiCartsRouter);

app
    .use(errorLogger)
    .use(adminErrorHandler)
    .use(errorHandler)
    .use(notFoundHandler);

module.exports = { app, db, port };