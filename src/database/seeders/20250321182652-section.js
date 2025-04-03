'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface) => {
    try { 
      await queryInterface.bulkInsert('sections', [
        {
          section_name : 'Destacado',
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          section_name : 'Oferta',
          createdAt : new Date,
          updatedAt : new Date
        }
      ], {});
    } catch (error) {
      console.error('Error al leer o insertar datos desde JSON:', error);
        throw error;
    }
  },

    down: async (queryInterface) => {
      await queryInterface.bulkDelete('sections', null, {});
    },
};
