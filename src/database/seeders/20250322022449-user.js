'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'users.json'), 'utf8');
      const users = JSON.parse(rawData);

      const usersWithTimestamps = users.map((item) => ({
        user_id: item.user_id,
        first_name: item.first_name,
        last_name: item.last_name,
        user_name: item.user_name,
        email: item.email,
        image: item.image,
        user_password: item.user_password,
        security_question: item.security_question,
        security_answer: item.security_answer,
        rol_id: item.rol_id,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      await queryInterface.bulkInsert('Users', usersWithTimestamps, {});
    } catch (error) {
      console.error('Error al leer o insertar datos desde JSON:', error);
      throw error;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};