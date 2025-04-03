'use strict';
const category = require('../../data/category.json')

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface) => {
    try { 
      const categoryWithTimestamps = category.map((item) => ({
        category_id: item.category_id,
        category_name: item.category_name,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      await queryInterface.bulkInsert('categories', categoryWithTimestamps, {});
    } catch (error) {
      console.error('Error al leer o insertar datos desde JSON:', error);
        throw error;
    }
  },

    down: async (queryInterface) => {
      await queryInterface.bulkDelete('categories', null, {});
    },
};
