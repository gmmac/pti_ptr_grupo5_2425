'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Interests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipmentSheetID: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'EquipmentSheets',
          key: 'barcode',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Ao apagar o equipamento, apaga o interesse
      },
      folderInterestID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'FolderInterests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Ao apagar a pasta de interesses, apaga o interesse
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Interests');
  }
};
