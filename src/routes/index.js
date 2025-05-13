const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const cartRoutes = require("./apiCarts"); 
router.get("/", indexController.home);

router.get("/", (req, res) => {
    const featuredProducts = req.app.locals.featuredProducts();
    const carouselItems = req.app.locals.carouselProducts();
    const randomProducts = getRandomProducts(req.app.locals.products, 3);

    if (!req.app.locals.products || !carouselItems) {
        console.error(
            "Error: products o carouselItems no están definidos. Revisa app.js"
        );
        return res.status(500).send("Error interno del servidor");
    }

    const uniqueRandomProducts = [];
    while (uniqueRandomProducts.length < 3 && randomProducts.length > 0) {
        const product = randomProducts.pop();
        if (!uniqueRandomProducts.includes(product)) {
            uniqueRandomProducts.push(product);
        }
    }

    res.render("index", {
        title: "Inicio",
        products: uniqueRandomProducts,
        carouselItems,
    });
});

router.use("/", cartRoutes); 

module.exports = router;
