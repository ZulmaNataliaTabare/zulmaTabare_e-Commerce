'use strict';
const fs = require('fs'); // Requerir módulo fs para manejo de archivos
const path = require('path'); // Requerir módulo path para manejo de rutas


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface) => {
    try { 
      const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'data', 'category.json'), 'utf-8');
      const category = JSON.parse(rawData);

      const categoryWithTimestamps = category.map((category) => ({...category,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      await queryInterface.bulkInsert('Category', categoryWithTimestamps, {});
    } catch (error) {
      console.error('Error al leer o insertar datos desde JSON:', error);
        throw error;
    }
  },

    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Category', null, {});
    },
};
