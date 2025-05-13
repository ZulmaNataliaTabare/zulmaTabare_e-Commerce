'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: 'default-image.png'
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      security_question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      security_answer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rols',
          key: 'rol_id'
      }
  },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    }); 
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
