'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('CharityProjectEquipmentTypes', [
{ charityProjectId: 1, equipmentTypeId: 2, quantity: 1, createdAt: "2025-06-24T23:30:51.956Z", updatedAt: "2025-06-24T23:30:51.956Z" },
{ charityProjectId: 1, equipmentTypeId: 4, quantity: 6, createdAt: "2025-06-24T23:30:51.956Z", updatedAt: "2025-06-24T23:30:51.956Z" },
{ charityProjectId: 1, equipmentTypeId: 13, quantity: 1, createdAt: "2025-06-24T23:30:51.956Z", updatedAt: "2025-06-24T23:30:51.956Z" },
{ charityProjectId: 1, equipmentTypeId: 14, quantity: 1, createdAt: "2025-06-24T23:30:51.956Z", updatedAt: "2025-06-24T23:30:51.956Z" },
{ charityProjectId: 3, equipmentTypeId: 1, quantity: 10, createdAt: "2025-06-25T03:12:21.699Z", updatedAt: "2025-06-25T03:12:21.699Z" },
{ charityProjectId: 3, equipmentTypeId: 5, quantity: 7, createdAt: "2025-06-25T03:12:21.699Z", updatedAt: "2025-06-25T03:12:21.699Z" },
{ charityProjectId: 3, equipmentTypeId: 7, quantity: 8, createdAt: "2025-06-25T03:12:21.699Z", updatedAt: "2025-06-25T03:12:21.699Z" },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjectEquipmentTypes', null, {});
  }
};