'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      clientPurchaseID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClientPurchases',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Carts');
  }
};