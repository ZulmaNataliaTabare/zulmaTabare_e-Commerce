const db = require('../database/models');

const getCart = async (req,res) => {
    try {
        return res.status(200).json({
            ok: true,
            data : req.session.cart || [] // Aseguramos que data sea un array si no existe el carrito
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        });
    }
}

const addItemToCart = async (req, res) => {
    try {
        console.log(req.params.id); 

        let product = await db.Product.findByPk(req.params.id, {
            include: ['category']
        });

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        let item = {
            id: product.product_id, 
            image:`/uploads/${product.image}`,
            precio: product.price,
            cantidad: 1,
            total: parseFloat(product.price) * 1,
            product_name: product.product_name,
        };

        let existing = req.session.cart.find(i => i.id === item.id);
        if (existing) {
            existing.cantidad += 1;
            existing.total = existing.precio * existing.cantidad;
        } else {
            req.session.cart.push(item);
        }

        return res.status(200).json({
            ok: true,
            data: req.session.cart
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        });
    }
}

const emptyCart = async (req,res) => {
    try {
        req.session.cart = [];
        return res.status(200).json({
            ok: true,
            data : req.session.cart
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        });
    }
}

const removeItemFromCart = async (req, res) => {
    try {
        const productId = req.params.id; 
        if (!req.session.cart || req.session.cart.length === 0) {
            return res.status(200).json({
                ok: true,
                data: []
            });
        }

        let foundIndex = req.session.cart.findIndex(item => item.id == productId);

        if (foundIndex !== -1) {
            
            if (req.session.cart[foundIndex].cantidad > 1) {
                req.session.cart[foundIndex].cantidad -= 1;
                req.session.cart[foundIndex].total = req.session.cart[foundIndex].precio * req.session.cart[foundIndex].cantidad;
            } else {
                req.session.cart.splice(foundIndex, 1);
            }
        }

        return res.status(200).json({
            ok: true,
            data: req.session.cart
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error al remover del carrito'
        });
    }
};

module.exports = {
    getCart,
    addItemToCart,
    emptyCart,
    removeItemFromCart 
}