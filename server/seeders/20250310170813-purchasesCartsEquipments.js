'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PurchaseCartEquipments', [
      {
        equipmentId: 1,
        clientPurchaseId: 101,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentId: 2,
        clientPurchaseId: 102,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentId: 3,
        clientPurchaseId: 103,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentId: 4,
        clientPurchaseId: 104,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentId: 5,
        clientPurchaseId: 105,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PurchaseCartEquipments', null, {});
  }
};
