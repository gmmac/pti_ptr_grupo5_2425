'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CharityProjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completionDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      organizerNic: {
        type: Sequelize.STRING(9),
        allowNull: false,
        references: { model: 'Organizers', key: 'nic' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ProjectStatuses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      warehouseID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Warehouses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      isActive: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: '1'
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
    await queryInterface.dropTable('CharityProjects');
  }
};