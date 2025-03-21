'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UsedEquipmentCharityProjects', [
      {
        usedEquipmentId: 1,
        charityProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usedEquipmentId: 2,
        charityProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usedEquipmentId: 3,
        charityProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usedEquipmentId: 4,
        charityProjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UsedEquipmentCharityProjects', null, {});
  }
};
