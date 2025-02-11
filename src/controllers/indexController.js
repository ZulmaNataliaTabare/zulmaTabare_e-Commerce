

const { filterProducts: myFilterProducts } = require('../utils/utils.js'); // Importa la función de filtrado

const indexController = {
    home: (req, res) => {
        const products = req.app.locals.products;

        if (!products) {
            console.error("Error: products no está definido. Revisa app.js");
            return res.status(500).send("Error interno del servidor");
        }

        const getRandomProducts = (products, num) => { 
            const shuffled = products.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };

        const randomProducts = getRandomProducts(products, 3);

        const featuredProducts = myFilterProducts(products, [1, 7, 12, 10, 20]); //Productos destacados

        res.render('index', {
            title: 'Inicio',
            products: randomProducts,
            featuredProducts,
            carouselItems: myFilterProducts(products, [1, 7, 12, 10, 20])
        });
    },
};

module.exports = indexController;