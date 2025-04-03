// src/utils/utils.js
const filterProducts = (products, ids) => products.filter(product => ids.includes(product.product_id));

function filterProductsByCategory(products, category) {
    if (!category) {
        return products;
    }
    return products.filter(product => product.category_id  === category);
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
    filterProducts,
    filterProductsByCategory,
    numeroAleatorio
};