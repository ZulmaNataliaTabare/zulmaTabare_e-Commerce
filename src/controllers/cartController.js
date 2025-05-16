
const db = require('../database/models');

const getCart = async (req,res) => {
    try {

        return res.status(200).json({
            ok: true,
            data : req.session.cart 
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    } 
}

const addItemToCart = async (req, res) => {
    try {
        console.log(req.params);

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

        // Si el producto ya existe en el carrito, aumentar la cantidad
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
        req.session.cart = []
        return res.status(200).json({
            ok: true,
            data : req.session.cart
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Upss, hubo un error'
        })
    }
}

const removeItem = async (e,id) => {
    try {
        let response = await fetch(urlBase + 'api/cart/item/remove/' + id); 
        let result = await response.json();
        console.log('Carrito actualizado (después de eliminar ítem):', result.data); 
        mostrarCantidad(result.data);
        cargarTabla(result.data);
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getCart,
    addItemToCart,
    emptyCart,
    removeItem
}