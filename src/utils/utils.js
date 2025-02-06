// Función auxiliar para filtrar productos
// utils.js
const filterProducts = (products, ids) => products.filter(product => ids.includes(product.id)); // Recibe products como argumento

module.exports = { filterProducts };