const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    // Formulario para agregar un producto
    addForm: (req, res) => {
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
    editForm: (req, res) => {
        const productId = parseInt(req.params.id);
        console.log('ID del producto:', productId); // Log para depuración
        const product = products.find(p => p.id === productId);
        if (product) {
          console.log('Producto encontrado:', product); // Log para depuración
        res.render('products/productEdit', { product });
        } else {
          console.log('Producto no encontrado'); // Log para depuración
        res.status(404).send('Producto no encontrado');
        }
    },

    // Actualizar un producto existente
    update: (req, res) => {
        const productId = parseInt(req.params.id);
        console.log('ID del producto:', productId); // Log para depuración
        const product = products.find(p => p.id === productId);
        if (product) {
            console.log('Producto antes de la actualización:', product); // Log para depuración
            product.name = req.body.name;
            product.description = req.body.description;
            if (req.file) product.image = req.file.filename;
            product.price = req.body.price;
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            console.log('Producto después de la actualización:', product); // Log para depuración
            res.redirect('/products');
        } else {
            console.log('Producto no encontrado'); // Log para depuración
            res.status(404).send('Producto no encontrado');
        }
    },
    

    // Vista de administración de productos
    admin: (req, res) => {
        const perPage = 5; // Productos por página
        const page = parseInt(req.query.page) || 1;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        const paginatedProducts = products.slice(start, end);
        const totalPages = Math.ceil(products.length / perPage);

        res.render('admin', {
            products: paginatedProducts,
            currentPage: page,
            totalPages: totalPages
        });
    },

    // Eliminar un producto
    delete: (req, res) => {
        const productId = parseInt(req.params.id);
        products = products.filter(product => product.id !== productId);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products/admin');
    },

    // Detalle de un producto
    getProductDetail: (req, res) => {
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


