'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EquipmentSheetCharityProjects', {
      equipmentSheetId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'EquipmentSheets',
          key: 'barcode',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      charityProjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'CharityProjects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EquipmentSheetCharityProjects');
  }
};
