'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Repairs', {
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
          model: 'RepairStatuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      description: {
        type: Sequelize.STRING(500)
      },
      budget: {
        type: Sequelize.FLOAT
      },
      completionDate: {
        type: Sequelize.DATE
      },
      employeeId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'nic',
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
    await queryInterface.dropTable('Repairs');
  }
};