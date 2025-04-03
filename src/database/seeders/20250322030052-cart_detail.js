const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
        try {
          const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'cart_details.json'), 'utf8');
          const cart_details = JSON.parse(rawData);
    
          const cart_detailsWithTimestamps = cart_details.map((item) => ({
            cart_item_id: item.cart_item_id,
            cart_id: item.cart_id,
            quantity: item.quantity,
            product_id: item.product_id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
          await queryInterface.bulkInsert('Cart_details', cart_detailsWithTimestamps, {});
        } catch (error) {
          console.error('Error al leer o insertar datos desde JSON:', error);
          throw error;
        }
      },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Cart_details', null, {});
  }
};
