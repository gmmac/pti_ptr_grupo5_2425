'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjects', [
      {
        startDate: new Date('2024-01-10'),
        completionDate: new Date('2024-03-15'),
        name: "Projeto 1",
        organizerNic: '122454888',
        status: 1,
        warehouseID: 1,
        totalSpace: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2024-02-01'),
        completionDate: new Date('2024-05-20'),
        name: "Projeto 2",
        organizerNic: '122454888',
        status: 1,
        warehouseID: 1,
        totalSpace: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2026-05-20'),
        completionDate: new Date('2029-05-20'),
        name: "Projeto 3",
        organizerNic: '123456789',
        status: 1,
        warehouseID: 3,
        totalSpace: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2025-03-20'),
        completionDate: new Date('2025-10-20'),
        name: "Projeto 4",
        organizerNic: '987654321',
        status: 2,
        warehouseID: 1,
        // totalSpace: ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjects', null, {});
  }
};
