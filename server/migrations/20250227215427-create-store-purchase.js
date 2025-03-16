'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StorePurchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storeID: {
        type: Sequelize.STRING(9),
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'nipc',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      clientNIC: {
        type: Sequelize.STRING(9),
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'nic',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      employeeID: {
        type: Sequelize.STRING(9),
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'nic',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      purchasePrice: {
        type: Sequelize.FLOAT
      },
      usedEquipmentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UsedEquipments',
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
    await queryInterface.dropTable('StorePurchases');
  }
};