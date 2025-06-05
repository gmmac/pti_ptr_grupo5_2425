'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      nipc: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING(9)
      },
      name: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      phone: {
        type: Sequelize.STRING(9),
        unique: true
      },
      openTime: {
        type: Sequelize.STRING(5)  // HH:MM
      },
      closeTime: {
        type: Sequelize.STRING(5) // HH:MM
      },
      address: {
        type: Sequelize.STRING(50)
      },
      latitude: {
        type: Sequelize.STRING(100)
      },
      longitude: {
        type: Sequelize.STRING(100)
      },
      isActive: {
        type: Sequelize.STRING(1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  }
};