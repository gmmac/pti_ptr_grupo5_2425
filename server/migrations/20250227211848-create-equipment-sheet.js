'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EquipmentSheets', {
      barcode: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      price: {
        type: Sequelize.FLOAT
      },
      model: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EquipmentModels',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      releaseYear: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EquipmentTypes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('EquipmentSheets');
  }
};