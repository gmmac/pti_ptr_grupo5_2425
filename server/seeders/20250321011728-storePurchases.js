'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StorePurchases', [
      {
        storeID: '486371589',
        clientNIC: '123456789',
        employeeID: '123355888',
        purchasePrice: 0,
        usedEquipmentID: 1,
        createdAt: new Date("2025-5-10"),
        updatedAt: new Date()
      },
      {
        storeID: '486371589',
        clientNIC: '987654321',
        employeeID: '123355888',
        purchasePrice: 0,
        usedEquipmentID: 5,
        createdAt: new Date("2025-5-15"),
        updatedAt: new Date()
      },
      {
        storeID: '486371589',
        clientNIC: '987654321',
        employeeID: '123355888',
        purchasePrice: 0,
        usedEquipmentID: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      storeID: '778800112',
      clientNIC: '987654321',
      employeeID: '456789012',
      purchasePrice: 0,
      usedEquipmentID: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('StorePurchases', null, {});
  }
};
