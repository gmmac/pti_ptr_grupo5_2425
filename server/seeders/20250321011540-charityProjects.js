'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjects', [
      {
        startDate: new Date('2024-01-10'),
        completionDate: new Date('2024-03-15'),
        organizerNic: '123456789',
        status: 1,
        warehouseID: 1,
        totalSpace: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2024-02-01'),
        completionDate: new Date('2024-05-20'),
        organizerNic: '123456789',
        status: 1,
        warehouseID: 1,
        totalSpace: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2024-04-01'),
        completionDate: null, // ainda em andamento
        organizerNic: '123456789',
        status: 1,
        warehouseID: 3,
        totalSpace: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjects', null, {});
  }
};
