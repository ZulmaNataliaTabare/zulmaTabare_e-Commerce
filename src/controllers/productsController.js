
// const fs = require('fs');
// const path = require('path');
// const productsFilePath = path.join(__dirname, '../data/products.json');
// const { filterProductsByCategory } = require('../utils/utils'); 



// const productsController = {
    
//     // Formulario para agregar un producto
//     add: (req, res) => {
//         res.render('products/productAdd');
//     },

//     // Crear un nuevo producto

    
//     create: (req, res) => {
//         try {
//             console.log("req.file:", req.file); // Imprime req.file para ver la información del archivo

//             if (!req.file) { // Verifica si req.file existe
//                 console.error("No se subió ningún archivo.");
//                 return res.render('products/productAdd', { error: "Debes seleccionar una imagen para el producto.", ...req.body }); // Renderiza con error
//             }

//             const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            
//             let features = req.body.features;

//             // Procesa features si es una cadena
//             if (typeof features === 'string') {
//             features = features.split(',').map(feature => feature.trim()); // Divide por comas y elimina espacios en blanco
//             }

//             // Asegura que features sea un array, si no lo es, inicializarlo como array vacio.
//             if (!Array.isArray(features)) {
//             features = [];
//             }
            
//             const newProduct = {
//                 product_id: products.length ? parseInt(products[products.length - 1].id) + 1 : 1,
//                 product_name: req.body.name,
//                 product_description: req.body.description,
//                 image: req.file.filename, // Usa req.file.filename (ya que se verificó que existe)
//                 category: req.body.category,
//                 features: req.body.features,
//                 colors: req.body.colors,
//                 price: req.body.price
//             };

//             products.push(newProduct);

//             try {
//                 fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
//             } catch (writeError) {
//                 console.error("Error al escribir products.json:", writeError);
//                 return res.render('products/productAdd', { error: "Error interno del servidor al guardar el producto.", ...req.body }); // Renderiza con error
//             }

//             res.redirect('/products');

//         } catch (error) {
//             console.error("Error al crear producto:", error);
//             res.render('products/productAdd', { error: "Error interno del servidor al crear el producto.", ...req.body }); // Renderiza con error
//         }
//     },



//     // Formulario para editar un producto
    
//     edit: (req, res) => {
//         try {
//             const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
//         const productId = parseInt(req.params.product_id);
//         const product = products.find(p => p.product_id === productId);
//         if (product) {
//             res.render('products/productEdit', { product, totalPages: 1 });
//         } else {
//             return res.render('products/admin', { error: 'Producto no encontrado' }); // Renderiza con error
//             }
//         } catch (error) {
//             console.error("Error al leer products.json:", error);
//             res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
//         }
//     },

//     // Actualizar un producto existente usando PUT
//     update: (req, res) => {
//         try {
//             const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//             const productId = parseInt(req.params.product_id);
//             const index = products.findIndex(p => p.product_id === productId); // Encuentra el índice del producto
    
//             if (index !== -1) {
//                 products[index] = { // Actualiza el producto en el array
//                     product_id: productId, //  mantener el ID
//                     product_name: req.body.name,
//                     product_description: req.body.description,
//                     image: req.file?.filename || products[index]?.image || 'default-image.png',                    
//                     price: req.body.price
//                 };
//                 fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
//                 res.redirect('/products');
//             } else {
//                 return res.render('products/admin', { error: 'Producto no encontrado' }); // Renderiza con error
//             }
//         } catch (error) {
//             console.error("Error al leer products.json:", error);
//             res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
//         }
//     },

//     // Vista de administración de productos
//     admin: (req, res) => {
//         try {
//             const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//             const perPage = 6; // Productos por página
//             const page = parseInt(req.query.page) || 1;
//             const start = (page - 1) * perPage;
//             const end = start + perPage;

//             const paginatedProducts = products.slice(start, end);
//             const totalPages = Math.ceil(products.length / perPage);

//             res.render('products/admin', {
//                 products: paginatedProducts,
//                 currentPage: page,
//                 totalPages: totalPages
//             });
//         } catch (error) {
//             console.error("Error al leer products.json:", error);
//             res.render('products/admin', {
//                 error: "Error interno del servidor",
//                 products: [],
//                 currentPage: 1,
//                 totalPages: 1 // Asegura que totalPages se pasa incluso en caso de error
//             });
//         }
//     },

//     // Eliminar un producto usando DELETE
//     remove: (req, res) => {
//         try {
//             const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//             const productId = parseInt(req.params.product_id);
//             const updatedProducts = products.filter(product => product.product_id !== productId); 
    
//             fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2)); 
//             res.redirect('/products/'); 
//         } catch (error) {
//             console.error("Error al eliminar producto:", error);
//             res.render('products/admin', { error: "Error interno del servidor" }); // Renderiza con error
//         }
//     },

//     // Detalle de un producto

// detail: (req, res) => {

//     try {
//     const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//     const productId = Number(parseInt(req.params.id, 10));
//     console.log('Buscando producto con ID:', productId);
    
//     const product = products.find(p => p.product_id === productId);
//     if (!product) {

        
//     return res.status(404).render('products/admin', { error: 'Producto no encontrado' });
//     }
    
//     console.log(product);
//     res.render('products/productDetail', {
//     product,
//     hasFeatures: Array.isArray(product.features) && product.features.length > 0
//     });
//     } catch (error) {
//     console.error("Error al leer products.json:", error);
//     res.status(500).render('products/admin', { error: "Error interno del servidor" });
//     }
//     },


//         // *** NUEVO MÉTODO PARA CATEGORIAS ***
//         category: async (req, res) => {
//             try {
//                 const category_id = req.query.category_id; 
//                 if (!category_id) {
//                     return res.status(400).render('products/category', {
//                         error: 'Categoría no especificada',
//                         category_id: null, 
//                         products: []
//                     });
//                 }
    
//                 const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//                 const filteredProducts = filterProductsByCategory(products, category_id);
    
//                 console.log('category_id:', category_id); 
//                 console.log('filteredProducts:', filteredProducts);
    
//                 res.render('products/category', {
//                     category_id: category_id, 
//                     products: filteredProducts,
//                     error: null
//                 });
//             } catch (error) {
//                 console.error("Error al ver la categoría:", error);
//                 res.status(500).render('products/category', {
//                     error: "Error interno del servidor",
//                     category_id: req.query.category_id, 
//                     products: []
//                 });
//             }
//         },
    
//         getAllProducts: async (req, res) => {
//             try {
//                 const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//                 res.render('products/allProducts', { products });
//             } catch (error) {
//                 console.error(error);
//                 res.render('products/allProducts', { 
//                     error: 'Error al obtener los productos',
//                     products: []
//                 });
//             }
//         }
//     };

// module.exports = productsController;


const { Product } = require('/../database/models'); // Importa los modelos
const multer = require('multer');
const path = require('path');

const productsController = {
    add: (req, res) => {
        res.render('products/productAdd');
    },

    create: async (req, res) => {
        try {
            if (!req.file) {
                return res.render('products/productAdd', { error: "Debes seleccionar una imagen para el producto.", ...req.body });
            }

            await Product.create({
                product_name: req.body.name,
                product_description: req.body.description,
                image: req.file.filename,
                category_id: req.body.category,
                features: req.body.features,
                colors: req.body.colors,
                price: req.body.price
            });

            res.redirect('/products');
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.render('products/productAdd', { error: "Error interno del servidor al crear el producto.", ...req.body });
        }
    },

    edit: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
                res.render('products/productEdit', { product, totalPages: 1 });
            } else {
                return res.render('products/admin', { error: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error("Error al obtener producto:", error);
            res.render('products/admin', { error: "Error interno del servidor" });
        }
    },

    update: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
                await Product.update({
                    product_name: req.body.name,
                    product_description: req.body.description,
                    image: req.file?.filename || product.image,
                    price: req.body.price
                }, {
                    where: { product_id: req.params.id }
                });
                res.redirect('/products');
            } else {
                return res.render('products/admin', { error: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            res.render('products/admin', { error: "Error interno del servidor" });
        }
    },

    admin: async (req, res) => {
        try {
            const perPage = 6;
            const page = parseInt(req.query.page) || 1;
            const start = (page - 1) * perPage;

            const products = await Product.findAll({
                limit: perPage,
                offset: start
            });

            const totalProducts = await Product.count();
            const totalPages = Math.ceil(totalProducts / perPage);

            res.render('products/admin', {
                products,
                currentPage: page,
                totalPages
            });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.render('products/admin', { error: "Error interno del servidor", products: [], currentPage: 1, totalPages: 1 });
        }
    },

    remove: async (req, res) => {
        try {
            await Product.destroy({
                where: { product_id: req.params.id }
            });
            res.redirect('/products/');
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            res.render('products/admin', { error: "Error interno del servidor" });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).render('products/admin', { error: 'Producto no encontrado' });
            }
            res.render('products/productDetail', { product, hasFeatures: Array.isArray(product.features) && product.features.length > 0 });
        } catch (error) {
            console.error("Error al obtener producto:", error);
            res.status(500).render('products/admin', { error: "Error interno del servidor" });
        }
    },

    category: async (req, res) => {
        try {
            const category_id = req.query.category_id;
            if (!category_id) {
                return res.status(400).render('products/category', { error: 'Categoría no especificada', category_id: null, products: [] });
            }
            const products = await Product.findAll({ where: { category_id } });
            res.render('products/category', { category_id, products, error: null });
        } catch (error) {
            console.error("Error al ver la categoría:", error);
            res.status(500).render('products/category', { error: "Error interno del servidor", category_id: req.query.category_id, products: [] });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.render('products/allProducts', { products });
        } catch (error) {
            console.error(error);
            res.render('products/allProducts', { error: 'Error al obtener los productos', products: [] });
        }
    }
};

module.exports = productsController;