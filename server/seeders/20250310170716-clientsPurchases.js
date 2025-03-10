'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ClientPurchases', [
      {
        clientNIC: '123456789', // Ajuste conforme os dados reais
        employeeID: '987654321', // Ajuste conforme os dados reais
        total: 500.75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientNIC: '987654321',
        employeeID: '123456789',
        total: 1200.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientNIC: '111222333',
        employeeID: '444555666',
        total: 750.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ClientPurchases', null, {});
  }
};
