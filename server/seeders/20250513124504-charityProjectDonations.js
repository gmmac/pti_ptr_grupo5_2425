'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('CharityProjectDonations', [
      // {
      //   usedEquipmentId: 1,
      //   charityProjectId: 2,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   usedEquipmentId: 2,
      //   charityProjectId: 2,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   usedEquipmentId: 4,
      //   charityProjectId: 2,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   usedEquipmentId: 5,
      //   charityProjectId: 2,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   usedEquipmentId: 6,
      //   charityProjectId: 2,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
// 
    // ], {});
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
