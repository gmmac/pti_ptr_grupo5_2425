'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clients", {
      nic: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING(9),
      },
      nif: {
        type: Sequelize.STRING(9),
        unique: true,
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.STRING(1),
      },
      firstName: {
        type: Sequelize.STRING(50),
      },
      lastName: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(9),
        unique: true,
      },
      address: {
        type: Sequelize.STRING(50),
      },
      latitude: {
        type: Sequelize.STRING(100),
      },
      longitude: {
        type: Sequelize.STRING(100),
      },
      isActive: {
        type: Sequelize.STRING(1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};