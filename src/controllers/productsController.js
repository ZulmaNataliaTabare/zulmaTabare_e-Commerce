
const db = require('../database/models'); 
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize'); 
const productsPerPage = 3;


const productsController = {
    add: async (req, res) => {
        try {
            const Category = await db.Category.findAll(); 
            const Colors = await db.Color.findAll(); 
            res.render('products/productAdd', { Categories: Category, availableColors: Colors }); 
        } catch (error) {
            console.error("Error al obtener categorías para el formulario de agregar producto:", error);
            res.render('products/productAdd', { error: "Error al cargar el formulario", Categories: [] });
        }
    },

    create: async (req, res) => {
        try {
            if (!req.file) {
                const Categories = await db.Category.findAll(); 
                return res.render('products/productAdd', { error: "Debes seleccionar una imagen para el producto.", ...req.body, Categories });
            }
    
            await db.Product.create({
                product_name: req.body.product_name, 
                product_description: req.body.description,
                image: req.file.filename,
                category_id: req.body.category_id, 
                features: req.body.features,
                colors: req.body.colors,
                price: req.body.price
            });
    
            res.redirect('/products');
        } catch (error) {
            console.error("Error al crear producto:", error);
            const Categories = await db.Category.findAll(); 
            res.render('products/productAdd', { error: "Error interno del servidor al crear el producto.", ...req.body, Categories });
        }
    },

    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
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
            const product = await db.Product.findByPk(req.params.id);
            if (product) {
                await db.Product.update({
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

            const products = await db.Product.findAll({
                limit: perPage,
                offset: start,
                include: [{
                    model: db.Category,
                    as: 'category', 
                    attributes: ['category_id', 'category_name'] 
                }]
            });

            const totalProducts = await db.Product.count();
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
            await db.Product.destroy({
                where: { product_id: req.params.id }
            });
            res.redirect('/products/');
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            res.render('products/admin', { error: "Error interno del servidor" });
        }
    },

    detail: async (req, res) => {
        let product = null; // Declare product outside the try block
        try {
        product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).render('products/admin', { error: 'Producto no encontrado', totalPages: 0 });
        }
        console.log(db.Product);
        res.render('products/productDetail', { product, hasFeatures: Array.isArray(product.features) && product.features.length > 0 });
        } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).render('products/admin', { error: "Error interno del servidor", totalPages: 0 });
        }
    },

    category: async (req, res) => {
        try {
            const category_id = req.query.category_id;
            if (!category_id) {
                return res.status(400).render('products/category', { error: 'Categoría no especificada', category_id: null, products: [] });
            }

            const category = await db.Category.findByPk(category_id);
            if (!category) {
                return res.status(404).render('products/category', { error: 'Categoría no encontrada', category_id: null, products: [] });
            }

            console.log(db.Product);
            const products = await db.Product.findAll({ where: { category_id } });
            res.render('products/category', { category: category, products, error: null });
        } catch (error) {
            console.error("Error al ver la categoría:", error);
            res.status(500).render('products/category', { error: "Error interno del servidor", category_id: req.query.category_id, products: [] });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * productsPerPage;

            const { count, rows: products } = await db.Product.findAndCountAll({
                limit: productsPerPage,
                offset: offset,
            });

            const totalPages = Math.ceil(count / productsPerPage);

            res.render('products/allProducts', {
                products: products,
                currentPage: page,
                totalPages: totalPages,
            });
        } catch (error) {
            console.error(error);
            res.render('products/allProducts', { error: 'Error al obtener los productos', products: [], currentPage: 1, totalPages: 1 });
        }
    },

    search: async (req, res) => {
        try {
            const searchTerm = req.query.q; 

            if (!searchTerm) {
                return res.render('products/allProducts', { products: [], searchTerm: '' }); 
            }

            const products = await db.Product.findAll({
                where: {
                    [Op.or]: [
                        {
                            product_name: {
                                [Op.like]: `%${searchTerm}%` 
                            }
                        },
                    ]
                }
            });

            res.render('products/allProducts', { products, searchTerm }); // Renderiza la vista con los resultados y el término de búsqueda
        } catch (error) {
            console.error("Error al buscar productos:", error);
            res.render('products/allProducts', { error: 'Error al realizar la búsqueda', products: [], searchTerm: '' });
        }
    },


};

module.exports = productsController;