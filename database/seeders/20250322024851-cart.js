'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
        try {
          const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'data', 'cart.json'), 'utf8');
          const carts = JSON.parse(rawData);
    
          const cartsWithTimestamps = carts.map((item) => ({
            cart_id: item.cart_id,
            user_id: item.user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
          await queryInterface.bulkInsert('Carts', cartsWithTimestamps, {});
        } catch (error) {
          console.error('Error al leer o insertar datos desde JSON:', error);
          throw error;
        }
      },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
