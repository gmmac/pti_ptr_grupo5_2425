'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StorePurchases', [
      {
        storeID: "123456789",
        clientNIC: "123456789",
        employeeID: "123456789",
        purchasePrice: 454.0,
        usedEquipmentID: 1,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "112233445",
        clientNIC: "123456788",
        employeeID: "456789012",
        purchasePrice: 877.0,
        usedEquipmentID: 5,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "123456789",
        clientNIC: "987654321",
        employeeID: "123000001",
        purchasePrice: 236.0,
        usedEquipmentID: 1,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "556677889",
        clientNIC: "987654326",
        employeeID: "123355888",
        purchasePrice: 510.0,
        usedEquipmentID: 2,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "486371589",
        clientNIC: "987654325",
        employeeID: "222444888",
        purchasePrice: 120.0,
        usedEquipmentID: 3,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "987654321",
        clientNIC: "895235746",
        employeeID: "234567890",
        purchasePrice: 645.0,
        usedEquipmentID: 4,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "488677889",
        clientNIC: "123456789",
        employeeID: "345678901",
        purchasePrice: 299.0,
        usedEquipmentID: 6,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "123456789",
        clientNIC: "987654323",
        employeeID: "567890123",
        purchasePrice: 430.0,
        usedEquipmentID: 2,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "112233445",
        clientNIC: "987654324",
        employeeID: "123000002",
        purchasePrice: 1050.0,
        usedEquipmentID: 1,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "486371589",
        clientNIC: "987654321",
        employeeID: "123000001",
        purchasePrice: 798.0,
        usedEquipmentID: 6,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "987654321",
        clientNIC: "895235746",
        employeeID: "254367988",
        purchasePrice: 218.0,
        usedEquipmentID: 5,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "488677889",
        clientNIC: "123456788",
        employeeID: "345678901",
        purchasePrice: 501.0,
        usedEquipmentID: 2,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "556677889",
        clientNIC: "987654326",
        employeeID: "234567890",
        purchasePrice: 315.0,
        usedEquipmentID: 4,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "486371589",
        clientNIC: "123456789",
        employeeID: "123355888",
        purchasePrice: 287.0,
        usedEquipmentID: 5,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "112233445",
        clientNIC: "123456788",
        employeeID: "567890123",
        purchasePrice: 450.0,
        usedEquipmentID: 3,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "987654321",
        clientNIC: "987654324",
        employeeID: "222444888",
        purchasePrice: 973.0,
        usedEquipmentID: 1,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "123456789",
        clientNIC: "123456789",
        employeeID: "456789012",
        purchasePrice: 138.0,
        usedEquipmentID: 4,
        createdAt: "2025-05-30T15:48:55.809Z",
        updatedAt: "2025-05-30T15:48:55.809Z"
      },
      {
        storeID: "486371589",
        clientNIC: "123456788",
        employeeID: "123355888",
        purchasePrice: 232.0,
        usedEquipmentID: 47,
        createdAt: "2025-06-04T15:52:59.610Z",
        updatedAt: "2025-06-04T15:52:59.610Z"
      },
      {
        storeID: "486371589",
        clientNIC: "895235746",
        employeeID: "123355888",
        purchasePrice: 34.0,
        usedEquipmentID: 48,
        createdAt: "2025-06-04T15:53:11.599Z",
        updatedAt: "2025-06-04T15:53:11.599Z"
      },
      {
        storeID: "486371589",
        clientNIC: "987654321",
        employeeID: "123355888",
        purchasePrice: 454.0,
        usedEquipmentID: 49,
        createdAt: "2025-06-04T15:53:37.357Z",
        updatedAt: "2025-06-04T15:53:37.357Z"
      },
      {
        storeID: "486371589",
        clientNIC: "895235746",
        employeeID: "123355888",
        purchasePrice: 232.0,
        usedEquipmentID: 50,
        createdAt: "2025-06-04T15:53:43.729Z",
        updatedAt: "2025-06-04T15:53:43.729Z"
      },
      {
        storeID: "486371589",
        clientNIC: "123456789",
        employeeID: "123355888",
        purchasePrice: 232.0,
        usedEquipmentID: 51,
        createdAt: "2025-06-04T15:54:12.239Z",
        updatedAt: "2025-06-04T15:54:12.239Z"
      },
      {
        storeID: "486371589",
        clientNIC: "987654324",
        employeeID: "123355888",
        purchasePrice: 453.0,
        usedEquipmentID: 52,
        createdAt: "2025-06-04T15:54:21.243Z",
        updatedAt: "2025-06-04T15:54:21.243Z"
      },
      {
        storeID: "486371589",
        clientNIC: "987654324",
        employeeID: "123355888",
        purchasePrice: 2342.0,
        usedEquipmentID: 53,
        createdAt: "2025-06-04T15:54:28.304Z",
        updatedAt: "2025-06-04T15:54:28.304Z"
      },
      {
        storeID: "486371589",
        clientNIC: "987654326",
        employeeID: "123355888",
        purchasePrice: 432.0,
        usedEquipmentID: 54,
        createdAt: "2025-06-04T15:54:37.532Z",
        updatedAt: "2025-06-04T15:54:37.532Z"
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('StorePurchases', null, {});
  }
};
