'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjectDonations', [
{ charityProjectId: 1, usedEquipmentId: 116, createdAt: "2025-06-24T20:08:27.370Z", updatedAt: "2025-06-24T20:08:27.370Z" },
{ charityProjectId: 1, usedEquipmentId: 72, createdAt: "2025-06-24T20:28:41.715Z", updatedAt: "2025-06-24T20:28:41.716Z" },
{ charityProjectId: 1, usedEquipmentId: 80, createdAt: "2025-06-24T22:12:54.330Z", updatedAt: "2025-06-24T22:12:54.330Z" },
{ charityProjectId: 1, usedEquipmentId: 78, createdAt: "2025-06-24T22:13:12.497Z", updatedAt: "2025-06-24T22:13:12.497Z" },
{ charityProjectId: 1, usedEquipmentId: 87, createdAt: "2025-06-24T22:13:39.750Z", updatedAt: "2025-06-24T22:13:39.750Z" },
{ charityProjectId: 2, usedEquipmentId: 107, createdAt: "2025-06-24T23:53:15.472Z", updatedAt: "2025-06-24T23:53:15.472Z" },
{ charityProjectId: 2, usedEquipmentId: 67, createdAt: "2025-06-24T23:54:01.704Z", updatedAt: "2025-06-24T23:54:01.704Z" },
{ charityProjectId: 3, usedEquipmentId: 66, createdAt: "2025-06-25T02:59:33.686Z", updatedAt: "2025-06-25T02:59:33.686Z" },
{ charityProjectId: 3, usedEquipmentId: 68, createdAt: "2025-06-25T02:59:43.497Z", updatedAt: "2025-06-25T02:59:43.497Z" },
{ charityProjectId: 3, usedEquipmentId: 84, createdAt: "2025-06-25T03:01:58.642Z", updatedAt: "2025-06-25T03:01:58.642Z" },
{ charityProjectId: 3, usedEquipmentId: 117, createdAt: "2025-06-25T03:02:13.628Z", updatedAt: "2025-06-25T03:02:13.628Z" },
{ charityProjectId: 3, usedEquipmentId: 109, createdAt: "2025-06-25T03:03:02.235Z", updatedAt: "2025-06-25T03:03:02.235Z" },
{ charityProjectId: 3, usedEquipmentId: 113, createdAt: "2025-06-25T03:03:48.574Z", updatedAt: "2025-06-25T03:03:48.574Z" },
{ charityProjectId: 4, usedEquipmentId: 101, createdAt: "2025-06-25T04:27:44.735Z", updatedAt: "2025-06-25T04:27:44.735Z" },
{ charityProjectId: 4, usedEquipmentId: 75, createdAt: "2025-06-25T04:27:59.557Z", updatedAt: "2025-06-25T04:27:59.557Z" },
{ charityProjectId: 5, usedEquipmentId: 69, createdAt: "2025-06-25T04:29:49.215Z", updatedAt: "2025-06-25T04:29:49.215Z" },

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
