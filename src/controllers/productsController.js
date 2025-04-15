const db = require('../database/models');
const path = require('path');
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');
const productsPerPage = 3;
const validateImage = require('../middlewares/validateImageMiddleware');

const productsController = {
    add: async (req, res) => {
        try {
            const [Category, Colors] = await Promise.all([
                db.Category.findAll(),
                db.Color.findAll() // Asumo que tienes un modelo Color si vas a validar colores
            ]);
            res.render('products/productAdd', { Categories: Category, availableColors: Colors, errors: {}, ...req.body }); // Mantén los datos del formulario en caso de error
        } catch (error) {
            console.error("Error al obtener categorías para el formulario de agregar producto:", error);
            res.render('products/productAdd', { error: "Error al cargar el formulario", Categories: [], errors: {}, ...req.body });
        }
    },

    create: [
        validateImage, // Middleware para validar el formato de la imagen (Multer se maneja en la ruta)
        body('product_name')
            .notEmpty().withMessage('El nombre del producto es obligatorio.')
            .isLength({ min: 5 }).withMessage('El nombre del producto debe tener al menos 5 caracteres.'),
        body('description')
            .notEmpty().withMessage('La descripción es obligatoria.')
            .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
        body('category_id')
            .notEmpty().withMessage('La categoría es obligatoria.')
            .isInt().withMessage('La categoría debe ser un valor numérico.')
            .custom(async value => {
                const category = await db.Category.findByPk(value);
                if (!category) {
                    throw new Error('La categoría seleccionada no es válida.');
                }
                return true;
            }),
        body('price')
            .notEmpty().withMessage('El precio es obligatorio.')
            .isDecimal().withMessage('El precio debe ser un número decimal válido.')
            .custom(value => {
                if (parseFloat(value) <= 0) {
                    throw new Error('El precio debe ser mayor que cero.');
                }
                return true;
            }),
        // Opcional: Validación de colores (asumiendo que 'colors' es un array de IDs)
        body('colors.*') // Valida cada elemento del array 'colors'
            .optional()
            .isInt().withMessage('El color seleccionado no es válido.')
            .custom(async value => {
                const color = await db.Color.findByPk(value);
                if (!color) {
                    throw new Error(`El color con ID ${value} no existe.`);
                }
                return true;
            }),
    
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const Categories = await db.Category.findAll();
                const Colors = await db.Color.findAll();
                return res.render('products/productAdd', {
                    errors: errors.mapped(),
                    Categories: Categories,
                    availableColors: Colors,
                    ...req.body
                });
            }
    
            try {
                const colorsArray = Array.isArray(req.body.colors) ? req.body.colors : (req.body.colors ? [req.body.colors] : null);
                await db.Product.create({
                    product_name: req.body.product_name,
                    product_description: req.body.description,
                    image: req.file ? req.file.filename : null, // Permite crear sin imagen inicialmente si no es obligatoria
                    category_id: req.body.category_id,
                    features: req.body.features,
                    colors: colorsArray ? colorsArray.join(',') : null, // Guarda los colores como string separado por comas
                    price: req.body.price,
                    stock: req.body.stock // Asegúrate de incluir el stock si lo tienes en el formulario
                });
                res.redirect('/products');
            } catch (error) {
                console.error("Error al crear producto:", error);
                const Categories = await db.Category.findAll();
                const Colors = await db.Color.findAll();
                res.render('products/productAdd', {
                    error: "Error interno del servidor al crear el producto.",
                    Categories: Categories,
                    availableColors: Colors,
                    errors: {},
                    ...req.body
                });
            }
        }
    ],

    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [{ association: 'category' }] // Incluye la categoría para acceder a category.category_id en la vista
            });
            const [Categories, Colors] = await Promise.all([
                db.Category.findAll(),
                db.Color.findAll() // Asumo que tienes un modelo Color
            ]);
            if (product) {
                res.render('products/productEdit', { product, Categories, availableColors: Colors, errors: {}, ...product.get({ plain: true }) }); // Inicializa errors y pasa los datos del producto al formulario
            } else {
                return res.render('products/admin', { error: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error("Error al obtener producto para editar:", error);
            res.render('products/admin', { error: "Error interno del servidor" });
        }
    },

   update: [
    validateImage, // Middleware para validar el formato de la imagen (Multer se maneja en la ruta)
    body('product_name')
        .notEmpty().withMessage('El nombre del producto es obligatorio.')
        .isLength({ min: 5 }).withMessage('El nombre del producto debe tener al menos 5 caracteres.'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
    body('category_id')
        .notEmpty().withMessage('La categoría es obligatoria.')
        .isInt().withMessage('La categoría debe ser un valor numérico.')
        .custom(async value => {
            const category = await db.Category.findByPk(value);
            if (!category) {
                throw new Error('La categoría seleccionada no es válida.');
            }
            return true;
        }),
    body('price')
        .notEmpty().withMessage('El precio es obligatorio.')
        .isDecimal().withMessage('El precio debe ser un número decimal válido.')
        .custom(value => {
            if (parseFloat(value) <= 0) {
                throw new Error('El precio debe ser mayor que cero.');
            }
            return true;
        }),
    // Opcional: Validación de colores (asumiendo que 'colors' es un array de IDs)
    body('colors.*') // Valida cada elemento del array 'colors'
        .optional()
        .isInt().withMessage('El color seleccionado no es válido.')
        .custom(async value => {
            const color = await db.Color.findByPk(value);
            if (!color) {
                throw new Error(`El color con ID ${value} no existe.`);
            }
            return true;
        }),

    async (req, res) => {
        const errors = validationResult(req);
        const product = await db.Product.findByPk(req.params.id);
        const Categories = await db.Category.findAll();
        const Colors = await db.Color.findAll();

        if (!errors.isEmpty()) {
            return res.render('products/productEdit', {
                errors: errors.mapped(),
                product: { ...product.get({ plain: true }), ...req.body }, // Combina datos del producto con los enviados
                Categories: Categories,
                availableColors: Colors
            });
        }

        try {
            const colorsArray = Array.isArray(req.body.colors) ? req.body.colors : (req.body.colors ? [req.body.colors] : (product.colors ? product.colors.split(',') : null));
            await db.Product.update({
                product_name: req.body.product_name,
                product_description: req.body.description,
                image: req.file ? req.file.filename : product.image,
                category_id: req.body.category_id,
                features: req.body.features,
                colors: colorsArray ? colorsArray.join(',') : null,
                price: req.body.price,
                stock: req.body.stock // Asegúrate de incluir el stock si lo tienes en el formulario
            }, {
                where: { product_id: req.params.id }
            });
            res.redirect('/products');
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            res.render('products/productEdit', {
                error: "Error interno del servidor al actualizar el producto.",
                product: { ...product.get({ plain: true }), ...req.body },
                Categories: Categories,
                availableColors: Colors,
                errors: {}
            });
        }
    }
],

    admin: async (req, res) => {
        const perPage = 6;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * perPage;

        try {
            const { count, rows: products } = await db.Product.findAndCountAll({
                limit: perPage,
                offset: offset,
                include: [{
                    model: db.Category,
                    as: 'category',
                    attributes: ['category_id', 'category_name']
                }]
            });

            const totalPages = Math.ceil(count / perPage);

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
        let product = null;
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

            const [category, products] = await Promise.all([
                db.Category.findByPk(category_id),
                db.Product.findAll({ where: { category_id } })
            ]);

            if (!category) {
                return res.status(404).render('products/category', { error: 'Categoría no encontrada', category_id: null, products: [] });
            }

            console.log(db.Product);
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
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * productsPerPage;

            if (!searchTerm) {
                const { count, rows: products } = await db.Product.findAndCountAll({
                    limit: productsPerPage,
                    offset: offset,
                });
                const totalPages = Math.ceil(count / productsPerPage);
                return res.render('products/allProducts', { products, searchTerm: '', currentPage: page, totalPages });
            }

            const { count, rows: products } = await db.Product.findAndCountAll({
                where: {
                    [Op.or]: [
                        {
                            product_name: {
                                [Op.like]: `%${searchTerm}%`
                            }
                        },
                    ]
                },
                limit: productsPerPage,
                offset: offset,
            });

            const totalPages = Math.ceil(count / productsPerPage);

            res.render('products/allProducts', { products, searchTerm, currentPage: page, totalPages });
        } catch (error) {
            console.error("Error al buscar productos:", error);
            res.render('products/allProducts', { error: 'Error al realizar la búsqueda', products: [], searchTerm: '', currentPage: 1, totalPages: 1 });
        }
    },
};


module.exports = productsController;