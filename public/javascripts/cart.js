console.log('Carrito online');
let spanCantidad = document.querySelector('span.badge'); //cantidad de productos en el icono del carrito
let changuito = document.querySelector('#lista-carrito tbody'); //caja donde se van agregar los productos del carrito
let spanTotal = document.getElementById('total'); //h5 total de productos agregados al carrito
let cartHead = document.getElementById('cart-head'); //encabezado de la tabla
let cartFooter = document.getElementById('cart-footer'); //pie de paǵina de la tabla
let cartEmpty = document.getElementById('cart-empty'); //span con la leyenda: no hay productos agregados
let btnCartEmpty = document.getElementById('btn-delete-cart'); //boton para vaciar el carrito
let btnNextBuy = document.getElementById('btn-next-buy'); //boton para continuar con la compra
const miModalCarrito = document.getElementById('mostrar-carrito'); // Obtener referencia al modal

const urlBase = window.location.origin + '/'; 
/**
 * Muestra la cantidad de productos agregados al carrito en el icono del carrito y en el men
 * @param {*} changuito Array de productos agregados al carrito
 */
const mostrarCantidad = (changuito) => {

    var cantidad = 0;
    var total = 0;

    if(changuito){
        changuito.forEach(item => {
            cantidad += item.cantidad
            total += item.total
        });
    }
    if(spanCantidad){
        spanCantidad.innerHTML = cantidad
        spanTotal.innerHTML = `<span>$</span> <span class="float-end">${total}</span>`;
}

    if(cantidad == 0){
        cartHead.style.display = 'none'
        cartFooter.style.display = 'none'
        cartEmpty.style.display = 'block'
        btnCartEmpty.classList.add('disabled');
        btnNextBuy.classList.add('disabled');
    }else{
        cartHead.style.display = "table-header-group"
        cartFooter.style.display = 'table-footer-group'
        cartEmpty.style.display = 'none'
        btnCartEmpty.classList.remove('disabled');
        btnNextBuy.classList.remove('disabled');
    }
    
}

/**
 * Carga la tabla con los productos agregados al carrito
 * @param {*} carrito Array de productos agregados al carrito
 */
const cargarTabla = (carrito) => {
    changuito.innerHTML = ""
    carrito.forEach(producto => {
        let item = `
            <td class="col-2">
            <img class="w-100" src="${producto.image}" id="imgProduct">
            </td>
            <td class="text-center col-3 align-middle">
            <a class="text-danger h5" onClick="removeItem(event,${producto.product_id})"><i class="fas fa-minus-square"></i></a>
            <span class="h5">${producto.cantidad}<span>
            <a class="text-success h5" onClick="addItem(event,${producto.products_id})"><i class="fas fa-plus-square"></i></a>
            </td>
            <td class="align-middle">
            ${producto.product_name}
            </td>

            <td class="align-middle">
            <span>$</span><span class="float-end">${producto.precio}</span>
            </td>
            <td class="align-middle">
            <span>$</span><span class="float-end">${producto.total}</span>
            </td>
            `;
        changuito.innerHTML += item
    });
    return false
}

/**
 * Obtiene los datos del carrito de la API y los muestra en la tabla
 * @returns
 */
const getCarrito = async () => {
    try {
        let response = await fetch(urlBase + 'api/cart')
        let result = await response.json()
        if(result.data && result.data.length > 0) {
            console.log('Carrito inicial:', result.data); 
            cargarTabla(result.data)
            mostrarCantidad(result.data)
        } else {
            console.log('Carrito inicial vacío'); 
            mostrarCantidad([])
        }
    } catch (error) {
        console.log(error)
    }
}

const agregarItem = async (e,id) => {
    console.log('Función agregarItem llamada con ID:', id);
    e.preventDefault()
    try {
        let response = await fetch(urlBase + 'api/cart/item/' + id)
        let result = await response.json()
        console.log('Carrito actualizado (después de agregar cantidad):', result.data); 
        mostrarCantidad(result.data);
        cargarTabla(result.data);

    } catch (error) {
        console.log(error)
    }
}

const agregarAlCarrito = async (elemento) => {
    const productId = elemento.dataset.productId;
    if (productId) {
        try {
            const response = await fetch(`/api/cart/item/${productId}`);
            const result = await response.json();
            if (result.ok) {
                console.log('Producto agregado al carrito (respuesta de la API):', result.data); 
                cargarTabla(result.data);
                mostrarCantidad(result.data);
                const modalCarrito = new bootstrap.Modal(document.getElementById('mostrar-carrito'));
                modalCarrito.show();
            } else {
                console.error('Error al agregar producto al carrito:', result.msg);
            }
        } catch (error) {
            console.error('Error de red al agregar al carrito:', error);
        }
    } else {
        console.error('No se encontró el ID del producto.');
    }
}

const vaciarCarrito = async (e) => {
    e.preventDefault()
    try {
        let response = await fetch(urlBase + 'api/cart/empty')
        let result = await response.json()
        console.log('Carrito vacío:', result.data); 
        mostrarCantidad(result.data);
        cargarTabla(result.data);
    } catch (error) {
        console.log(error)
    }
}






