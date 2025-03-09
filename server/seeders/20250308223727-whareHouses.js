'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Wharehouses', [
      {
        name: 'Central Storage',
        totalSlots: 100,
        availableSlots: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'North Depot',
        totalSlots: 200,
        availableSlots: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'South Facility',
        totalSlots: 150,
        availableSlots: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wharehouses', null, {});
  }
};