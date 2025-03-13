const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const { filterProductsByCategory } = require('../utils/utils'); 



const productsController = {
    
    // Formulario para agregar un producto
    add: (req, res) => {
        res.render('products/productAdd');
    },

    // Crear un nuevo producto
    
    create: (req, res) => {
        try {
            console.log("req.file:", req.file); // Imprime req.file para ver la información del archivo

            if (!req.file) { // Verifica si req.file existe
                console.error("No se subió ningún archivo.");
                return res.render('products/productAdd', { error: "Debes seleccionar una imagen para el producto.", ...req.body }); // Renderiza con error
            }

            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            const newProduct = {
                id: products.length ? parseInt(products[products.length - 1].id) + 1 : 1,
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename, // Usa req.file.filename (ya que se verificó que existe)
                category: req.body.category,
                colors: req.body.colors,
                price: req.body.price
            };

            products.push(newProduct);

            try {
                fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            } catch (writeError) {
                console.error("Error al escribir products.json:", writeError);
                return res.render('products/productAdd', { error: "Error interno del servidor al guardar el producto.", ...req.body }); // Renderiza con error
            }

            res.redirect('/products');

        } catch (error) {
            console.error("Error al crear producto:", error);
            res.render('products/productAdd', { error: "Error interno del servidor al crear el producto.", ...req.body }); // Renderiza con error
        }
    },



    // Formulario para editar un producto
    edit: (req, res) => {
        try {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        if (product) {
            res.render('products/productEdit', { product });
        } else {
            return res.render('products/admin', { error: 'Producto no encontrado' }); // Renderiza con error
            }
        } catch (error) {
            console.error("Error al leer products.json:", error);
            res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
        }
    },

    // Actualizar un producto existente usando PUT
    update: (req, res) => {
        try {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            const productId = parseInt(req.params.id);
            const index = products.findIndex(p => p.id === productId); // Encuentra el índice del producto
    
            if (index !== -1) {
                products[index] = { // Actualiza el producto en el array
                    id: productId, //  mantener el ID
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file?.filename || products[index]?.image || 'default-image.png',                    
                    price: req.body.price
                };
                fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
                res.redirect('/products');
            } else {
                return res.render('products/admin', { error: 'Producto no encontrado' }); // Renderiza con error
            }
        } catch (error) {
            console.error("Error al leer products.json:", error);
            res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
        }
    },

    // Vista de administración de productos
    admin: (req, res) => {
        try {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
            const perPage = 6; // Productos por página
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
        } catch (error) {
            console.error("Error al leer products.json:", error);
            res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
        }
    },

    // Eliminar un producto usando DELETE
    remove: (req, res) => {
        try {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            const productId = parseInt(req.params.id);
            const updatedProducts = products.filter(product => product.id !== productId); 
    
            fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2)); 
            res.redirect('/products/'); 
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
        }
    },

    // Detalle de un producto
    detail: (req, res) => {
        try {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
            const productId = parseInt(req.params.id, 10);
            const product = products.find(p => p.id === productId);

            if (product) {
                res.render('products/productDetail', {
                    product
                });
            } else {
                return res.render('products/admin', { error: 'Producto no encontrado' }); // Renderiza con error
            }
        } catch (error) {
            console.error("Error al leer products.json:", error);
            res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
        }
    },


        // *** NUEVO MÉTODO PARA CATEGORIAS ***
        category: (req, res) => {
            try {
                const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
                const category = req.query.category;
    
                
                const filteredProducts = filterProductsByCategory(products, category);
    
                res.render('products/category', { category, products: filteredProducts });
            } catch (error) {
                console.error("Error al ver la categoría:", error);
                res.render('products/category', { error: "Error interno del servidor", category: req.query.category, ...req.body }); // Renderiza con error
            }
        },
        
        getAllProducts: async (req, res) => {
            try {
            const products = require('../data/products.json');
            res.render('products/allProducts', { products }); 
            } catch (error) {
            console.error(error);
            res.render('products/allProducts', { error: 'Error al obtener los productos' }); // Renderiza con error
        }
    }
};


module.exports = productsController;

