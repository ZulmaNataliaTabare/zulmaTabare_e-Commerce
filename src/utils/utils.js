// src/utils/utils.js
const filterProducts = (products, ids) => products.filter(product => ids.includes(product.product_id));

function filterProductsByCategory(products, category) {
    if (!category) {
        return products;
    }
    return products.filter(product => product.category_id?.toLowerCase() === category.toLowerCase());
}

module.exports = {
    filterProducts,
    filterProductsByCategory
};