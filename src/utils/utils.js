// Función auxiliar para filtrar productos
const filterProducts = (products, ids) => products.filter(product => ids.includes(product.id)); // Recibe products como argumento

module.exports = { filterProducts };