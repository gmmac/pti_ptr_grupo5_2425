'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('EquipmentSheetCharityProjects', [
     { equipmentSheetId: "10000000000000000029", charityProjectId: 2, quantity: 35, createdAt: "2025-06-24T23:47:14.407Z", updatedAt: "2025-06-24T23:47:14.407Z" },
{ equipmentSheetId: "10000000000000000015", charityProjectId: 2, quantity: 5, createdAt: "2025-06-24T23:47:14.407Z", updatedAt: "2025-06-24T23:47:14.407Z" },
{ equipmentSheetId: "10000000000000000039", charityProjectId: 2, quantity: 24, createdAt: "2025-06-24T23:47:14.407Z", updatedAt: "2025-06-24T23:47:14.407Z" },
{ equipmentSheetId: "10000000000000000012", charityProjectId: 3, quantity: 3, createdAt: "2025-06-25T03:12:11.531Z", updatedAt: "2025-06-25T03:12:11.531Z" },
{ equipmentSheetId: "10000000000000000094", charityProjectId: 3, quantity: 1, createdAt: "2025-06-25T03:12:11.531Z", updatedAt: "2025-06-25T03:12:11.531Z" },
{ equipmentSheetId: "90123456789012345678", charityProjectId: 4, quantity: 5, createdAt: "2025-06-25T04:27:18.004Z", updatedAt: "2025-06-25T04:27:18.004Z" },
{ equipmentSheetId: "90123456789012345679", charityProjectId: 4, quantity: 1, createdAt: "2025-06-25T04:27:18.004Z", updatedAt: "2025-06-25T04:27:18.004Z" },
{ equipmentSheetId: "10000000000000000028", charityProjectId: 4, quantity: 9, createdAt: "2025-06-25T04:27:18.004Z", updatedAt: "2025-06-25T04:27:18.004Z" },
 
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentSheetCharityProjects', null, {});
  }
};