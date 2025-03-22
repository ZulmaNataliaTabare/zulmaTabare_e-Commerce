'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async  (queryInterface) => {
    try {
      const rawData =fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'data', 'rols.json'), 'utf8');
      const rols = JSON.parse(rawData);

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
