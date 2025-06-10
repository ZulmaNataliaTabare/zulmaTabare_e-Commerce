'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
        try {
          const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'sizes.json'), 'utf8');
          const sizes = JSON.parse(rawData);
    
          const sizesWithTimestamps = sizes.map((item) => ({
            size_id: item.size_id,
            size_name: item.size_name,
            size_description: item.size_description,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
          await queryInterface.bulkInsert('sizes', sizesWithTimestamps, {});
        } catch (error) {
          console.error('Error al leer o insertar datos desde JSON:', error);
          throw error;
        }
      },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};
