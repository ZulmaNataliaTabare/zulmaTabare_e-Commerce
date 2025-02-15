document.addEventListener('DOMContentLoaded', () => {

    // 1. Event Delegation :
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('agregarAlcart')) {
            const card = event.target.closest('.card');
            const idProducto = card.dataset.productId;
            const nombreProducto = card.querySelector('.article-text:nth-child(2)').textContent;
            const precioProducto = card.querySelector('.article-text:nth-child(1)').textContent.replace('$', '');

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const productoExistente = carrito.find(p => p.id === idProducto);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({
                    id: idProducto,
                    nombre: nombreProducto,
                    precio: precioProducto,
                    cantidad: 1
                });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarVistaCarrito(); // Actualiza la vista del carrito
        }
    });

    // 2. Función para actualizar la vista del carrito (`cart.ejs`):
    function actualizarVistaCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const tablaCarrito = document.querySelector('.cart-table tbody');

        if (tablaCarrito) { // Verifica si la tabla existe (para otras páginas)
            tablaCarrito.innerHTML = ''; // Limpia la tabla

            carrito.forEach(producto => {
                const fila = tablaCarrito.insertRow();
                fila.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td><input type="number" value="${producto.cantidad}" min="1" data-product-id="${producto.id}"></td>
                    <td>$${producto.precio}</td>
                    <td>$${producto.precio * producto.cantidad}</td>
                    <td><button class="remove-button" data-product-id="${producto.id}">Eliminar</button></td>
                `;

                // Evento para eliminar producto
                const botonEliminar = fila.querySelector('.remove-button');
                botonEliminar.addEventListener('click', () => {
                    const idProductoEliminar = botonEliminar.dataset.productId;
                    carrito = carrito.filter(p => p.id !== idProductoEliminar);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarVistaCarrito();
                });

                // Evento para actualizar la cantidad
                const inputCantidad = fila.querySelector('input[type="number"]');
                inputCantidad.addEventListener('change', () => {
                const idProductoActualizar = inputCantidad.dataset.productId;
                const nuevaCantidad = parseInt(inputCantidad.value);

                const productoActualizado = carrito.find(p => p.id === idProductoActualizar);
                if (productoActualizado) {
                    productoActualizado.cantidad = nuevaCantidad;
                }

                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarVistaCarrito();
                });

            });
        }
    }

    // 3. Actualización inicial de la vista del carrito (al cargar la página):
    actualizarVistaCarrito();

});