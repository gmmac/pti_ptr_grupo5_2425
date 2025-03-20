'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsedEquipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EquipmentStatuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      price: {
        type: Sequelize.FLOAT
      },
      saleDate: {
        type: Sequelize.DATE
      },
      purchaseDate: {
        type: Sequelize.DATE
      },
      equipmentId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'EquipmentSheets',
          key: 'barcode',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      storeId: {
        type: Sequelize.STRING(9),
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'nipc',
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
    await queryInterface.dropTable('UsedEquipments');
  }
};