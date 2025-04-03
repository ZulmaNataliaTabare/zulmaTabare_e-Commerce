'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
        try {
          const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'colors.json'), 'utf8');
          const colors = JSON.parse(rawData);
    
          const colorsWithTimestamps = colors.map((item) => ({
            color_id: item.color_id,
            color_name: item.color_name,
            color_code: item.color_code,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
          await queryInterface.bulkInsert('Colors', colorsWithTimestamps, {});
        } catch (error) {
          console.error('Error al leer o insertar datos desde JSON:', error);
          throw error;
        }
      },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
