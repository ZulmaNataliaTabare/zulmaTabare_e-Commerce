const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    
    // Formulario para agregar un producto
    add: (req, res) => {
        res.render('products/productAdd');
    },

    // Crear un nuevo producto
    create: (req, res) => {
        const newProduct = {
            id: products.length ? parseInt(products[products.length - 1].id) + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : 'default-image.png',
            category: req.body.category,
            colors: req.body.colors,
            price: req.body.price
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },

    // Formulario para editar un producto
    edit: (req, res) => {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        if (product) {
            res.render('products/productEdit', { product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    // Actualizar un producto existente usando PUT
    update: (req, res) => {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        if (product) {
            product.name = req.body.name;
            product.description = req.body.description;
            if (req.file) product.image = req.file.filename;
            product.price = req.body.price;
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            res.redirect('/products');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    // Vista de administración de productos
    admin: (req, res) => {
        const perPage = 4; // Productos por página
        const page = parseInt(req.query.page) || 1;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        const paginatedProducts = products.slice(start, end);
        const totalPages = Math.ceil(products.length / perPage);

        res.render('products/admin', {
            products: paginatedProducts,
            currentPage: page,
            totalPages: totalPages
        });
    },

    // Eliminar un producto usando DELETE
    remove: (req, res) => {
        const productId = parseInt(req.params.id);
        products = products.filter(product => product.id !== productId);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products/admin');
    },

    // Detalle de un producto
    detail: (req, res) => {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (product) {
            res.render('products/productDetail', { product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }
};

// Exportar los controladores
module.exports = productsController;

