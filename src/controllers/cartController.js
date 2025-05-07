
const db = require('../database/models');

console.log("✅ cartController cargado");


const cartController = {
    addToCart: async (req, res) => {
        const productId = req.params.id;
        const userId = req.session.userLogged ? req.session.userLogged.user_id : null;

        if (!userId) {
            return res.status(401).json({ message: 'Tenés que estar logueado para agregar productos!' });
        }

        try {
            let cart = await db.Cart.findOne({ where: { user_id: userId } });
            if (!cart) {
                cart = await db.Cart.create({ user_id: userId });
            }

            let cartDetail = await db.Cart_detail.findOne({ 
                where: { 
                    cart_id: cart.cart_id, 
                    product_id: productId 
                } 
            });
        
            if (cartDetail) {
                await cartDetail.increment('quantity', { by: 1 });
                return res.status(200).json({ message: 'Producto actualizado en el carrito!' });
            } else {
                await db.Cart_detail.create({ 
                    cart_id: cart.cart_id, 
                    product_id: productId, 
                    quantity: 1 
                });
                return res.status(201).json({ message: 'Producto agregado al carrito!' });
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            return res.status(500).json({ message: 'Error al agregar el producto al carrito' });
        }
    },

    removeFromCart: async (req, res) => {
        const productId = req.params.id;
        const userId = req.session.userLogged ? req.session.userLogged.user_id : null;

        if (!userId) {
            return res.status(401).json({ message: 'Tenés que estar logueado para eliminar productos!' });
        }

        try {
            const cart = await db.Cart.findOne({ where: { user_id: userId } });
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            const cartDetail = await db.Cart_detail.findOne({ 
                where: { 
                    cart_id: cart.cart_id, 
                    product_id: productId 
                } 
            });

            if (!cartDetail) {
                return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
            }

            if (cartDetail.quantity > 1) {
                await cartDetail.decrement('quantity', { by: 1 });
                return res.status(200).json({ message: 'Cantidad del producto actualizada en el carrito!' });
            } else {
                await cartDetail.destroy();
                return res.status(200).json({ message: 'Producto eliminado del carrito!' });
            }
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
            return res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
        }
    },
};

module.exports = cartController;
