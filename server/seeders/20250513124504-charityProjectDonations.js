'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjectDonations', [
      {
        usedEquipmentId: 1,
        charityProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usedEquipmentId: 5,
        charityProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usedEquipmentId: 6,
        charityProjectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usedEquipmentId: 3,
        charityProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
