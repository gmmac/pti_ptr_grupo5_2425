'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjects', [
      {
        startDate: new Date('2024-01-10'),
        completionDate: new Date('2024-06-15'),
        organizerNic: '123456789',
        status: 1, // Pending
        wharehouseID: 1,
        totalSpace: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2024-02-20'),
        completionDate: new Date('2024-07-30'),
        organizerNic: '987654321',
        status: 2, // In Progress
        wharehouseID: 2,
        totalSpace: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2023-09-15'),
        completionDate: new Date('2024-03-10'),
        organizerNic: '234567890',
        status: 3, // Completed
        wharehouseID: 3,
        totalSpace: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjects', null, {});
  }
};
