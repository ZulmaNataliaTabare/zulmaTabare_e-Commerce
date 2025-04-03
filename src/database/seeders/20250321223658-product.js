'use strict';
const products = require('../../data/products.json');
const { numeroAleatorio } = require('../../utils/utils');

module.exports = {
  up: async (queryInterface) => {
    try { 
      const productsWithTimestamps = products.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        image: item.image,
        product_description: item.product_description,
        features: Array.isArray(item.features) ? JSON.stringify(item.features) : item.features, // Convertir array a string
        category_id: item.category_id,
        section_id : numeroAleatorio(1,2),
        stock: item.stock,
        createdAt: new Date(), 
        updatedAt: new Date(), 
      }));
      await queryInterface.bulkInsert('products', productsWithTimestamps, {}); // Inserta en la tabla 'products'
    } catch (error) {
      console.error('Error al leer o insertar datos desde JSON:', error);
      throw error;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {}); // Elimina de la tabla 'products'
  },
};