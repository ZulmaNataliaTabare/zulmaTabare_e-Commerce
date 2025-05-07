
document.addEventListener('DOMContentLoaded', () => {
    const heartIcons = document.querySelectorAll('.contenedor-img-ambos .card .fav .fa-heart');

    heartIcons.forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const card = event.target.closest('.card');
            const productId = card.dataset.productId;

            if (!productId) {
                console.error("No se encontró el ID del producto.");
                alert("Error: No se pudo agregar al carrito.");
                return;
            }

            try {
                const response = await fetch(`/cart/add/${productId}`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error al agregar al carrito:", error);
                alert("Hubo un error al agregar el producto al carrito.");
            }
        });
    });
});