'use strict';
const rols = require('../../data/rols.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async  (queryInterface) => {
    try {

      const rolsWithTimestamps = rols.map((item) => ({
        rol_id: item.rol_id,
        rol_name: item.rol_name,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      await queryInterface.bulkInsert('rols', rolsWithTimestamps,{});
    } catch (error) {
      console.error('Error al leer o insertar datos desde JSON:',error);
      throw error;
    }
  },

  down: async  (queryInterface) => {
    await queryInterface.bulkDelete('rols', null, {});
  },
};
