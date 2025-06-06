'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CharityProjectDonations', {
      charityProjectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'CharityProjects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      usedEquipmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'UsedEquipments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CharityProjectDonations');
  }
};
