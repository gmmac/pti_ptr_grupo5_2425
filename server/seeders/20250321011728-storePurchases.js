'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('StorePurchases', [
    //   {
    //     storeID: '123456789',
    //     clientNIC: '895235746',
    //     employeeID: '123355888',
    //     purchasePrice: 0.00,
    //     usedEquipmentID: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     storeID: '123456789',
    //     clientNIC: '123456789',
    //     employeeID: '123355888',
    //     purchasePrice: 50.00,
    //     usedEquipmentID: 2,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     storeID: '123456789',
    //     clientNIC: '123456789',
    //     employeeID: '123355888',
    //     purchasePrice: 100.00,
    //     usedEquipmentID: 3,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // },
    // {
    //   storeID: '123456789',
    //   clientNIC: '123456789',
    //   employeeID: '123355888',
    //   purchasePrice: 150.00,
    //   usedEquipmentID: 4,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   storeID: '123456789',
    //   clientNIC: '895235746',
    //   employeeID: '123355888',
    //   purchasePrice: 200.00,
    //   usedEquipmentID: 5,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   storeID: '123456789',
    //   clientNIC: '123456789',
    //   employeeID: '123355888',
    //   purchasePrice: 250.00,
    //   usedEquipmentID: 6,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },

    // ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('StorePurchases', null, {});
  }
};
