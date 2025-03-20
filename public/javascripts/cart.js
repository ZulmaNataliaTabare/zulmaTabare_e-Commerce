document.addEventListener('DOMContentLoaded', () => {

    // 1. Event Delegation para "Agregar al Carrito" y "Agregar a Favoritos":
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('agregarAlCart')) {
            agregarAlCarrito(event);
        } else if (event.target.classList.contains('fa-heart')) {
            agregarAFavoritos(event);
        }
    });

    function agregarAlCarrito(event) {
        const card = event.target.closest('.card');
        const idProducto = card.dataset.productId;
        const nombreProducto = card.querySelector('.article-text:nth-child(2)').textContent;
        const precioProducto = card.querySelector('.article-text:nth-child(1)').textContent.replace('$', '');

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const productoIndex = carrito.findIndex(p => p.id === idProducto);
        if (productoIndex !== -1) {
            carrito[productoIndex].cantidad++;
        } else {
            carrito.push({
                product_id: idProducto,
                product_name: nombreProducto,
                price: precioProducto,
                cantidad: 1
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
    }

    function agregarAFavoritos(event) {
        const card = event.target.closest('.card');
        const idProducto = card.dataset.productId;
        const nombreProducto = card.querySelector('.article-text:nth-child(2)').textContent;
        const precioProducto = card.querySelector('.article-text:nth-child(1)').textContent.replace('$', '');

        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

        const productoIndex = favoritos.findIndex(p => p.product_id === idProducto);
        if (productoIndex === -1) {
            favoritos.push({
                product_id: idProducto,
                product_name: nombreProducto,
                price: precioProducto,
            });
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log("Producto agregado a favoritos:", nombreProducto);
    }

    // 2. Función para actualizar la vista del carrito (`cart.ejs`):
    function actualizarVistaCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const tablaCarrito = document.querySelector('.cart-table tbody');

        if (tablaCarrito) {
            tablaCarrito.innerHTML = ''; // Limpia la tabla

            let subtotal = 0;

            carrito.forEach(producto => {
                const fila = tablaCarrito.insertRow();
                const totalProducto = producto.price * producto.cantidad;
                subtotal += totalProducto;

                fila.innerHTML = `
                    <td>${producto.product_name}</td>
                    <td><input type="number" value="${producto.cantidad}" min="1" data-product-id="${producto.product_id}"></td>
                    <td>$${producto.price}</td>
                    <td>$${totalProducto}</td>
                    <td><button class="remove-button" data-product-id="${producto.product_id}">Eliminar</button></td>
                `;
            });

            // Actualizar resumen de compra (con IDs)
            const resumenSubtotal = document.getElementById('subtotal');
            const resumenTotal = document.getElementById('total');

            if (resumenSubtotal && resumenTotal) {
                resumenSubtotal.textContent = `Subtotal: $${subtotal}`;
                resumenTotal.textContent = `Total: $${subtotal + 10}`;
            } else {
                console.error("Elementos de resumen no encontrados.  Asegúrate de que los IDs 'subtotal' y 'total' estén en cart.ejs.");
            }
        }
    }

    // 3. Botón para vaciar el carrito:
    const clearCartButton = document.querySelector('.clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            localStorage.removeItem('carrito');
            actualizarVistaCarrito();
        });
    }

    // 4. Delegación de eventos para "Eliminar" y "Cantidad":
    const cartTable = document.querySelector('.cart-table'); // Obtener la tabla *una vez*

    if (cartTable) { // Verificar si la tabla existe
        cartTable.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-button')) {
                const idProductoEliminar = event.target.dataset.productId;
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito = carrito.filter(p => p.product_id !== idProductoEliminar);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarVistaCarrito();
            }
        });

        cartTable.addEventListener('change', (event) => {
            if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
                const idProductoActualizar = event.target.dataset.productId;
                const nuevaCantidad = parseInt(event.target.value);
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

                const productoIndex = carrito.findIndex(p => p.product_id === idProductoActualizar);
                if (productoIndex !== -1) {
                    carrito[productoIndex].cantidad = nuevaCantidad;
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarVistaCarrito();
            }
        });
    } else {
        console.log(document.querySelector('.cart-table'));
        console.error("Elemento .cart-table no encontrado. Asegúrate de que esté en cart.ejs.");
    }

    // 5. Inicializar la vista del carrito (al cargar la página):
    actualizarVistaCarrito();
});