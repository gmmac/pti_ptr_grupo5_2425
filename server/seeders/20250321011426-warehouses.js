'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Warehouses', [
      {
        name: 'Central Warehouse',
        totalSlots: 100,
        availableSlots: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'North Facility',
        totalSlots: 50,
        availableSlots: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'East Depot',
        totalSlots: 80,
        availableSlots: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Warehouses', null, {});
  }
};
