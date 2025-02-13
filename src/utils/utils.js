const filterProducts = (products, ids) => products.filter(product => ids.includes(product.id)); // Filtra por IDs

function filterProductsByCategory(products, category) {
    if (!category) { 
        return products; 
    }

    return products.filter(product => product.category?.toLowerCase() === category.toLowerCase());
}

module.exports = { 
    filterProducts, 
    filterProductsByCategory 
};