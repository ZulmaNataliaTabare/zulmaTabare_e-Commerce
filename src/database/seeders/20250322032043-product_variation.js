'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
        try {
          const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'product_variations.json'), 'utf8');
          const product_variations = JSON.parse(rawData);
    
          const product_variationsWithTimestamps = product_variations.map((item) => ({
            product_variation_id: item.product_variation_id,
            product_id_variations: item.product_id_variations,
            size_id_variations: item.size_id_variations,
            color_id_variations: item.color_id_variations,
            stock: item.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
          await queryInterface.bulkInsert('product_variations', product_variationsWithTimestamps, {});
        } catch (error) {
          console.error('Error al leer o insertar datos desde JSON:', error);
          throw error;
        }
      },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('product_variations', null, {});
  }
};
