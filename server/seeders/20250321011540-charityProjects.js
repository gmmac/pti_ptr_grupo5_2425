'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjects', [
      {
        startDate: new Date('2025-01-10'),
        completionDate: new Date('2025-07-15'),
        name: "Campanha de Inverno",
        organizerNic: '122454888',
        status: 2,
        warehouseID: 1,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2024-02-01'),
        completionDate: new Date('2024-05-20'),
        name: "Recolha Escolar 2024",
        organizerNic: '122454888',
        status: 3,
        warehouseID: 1,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2026-05-20'),
        completionDate: new Date('2029-05-20'),
        name: "Apoio Humanitário África",
        organizerNic: '123456789',
        status: 1,
        warehouseID: 3,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2025-03-20'),
        completionDate: new Date('2025-10-20'),
        name: "Projeto Gaming Comunitário",
        organizerNic: '987654321',
        status: 2,
        warehouseID: 1,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2025-06-01'),
        completionDate: new Date('2025-12-31'),
        name: "Natal Solidário",
        organizerNic: '111222333',
        status: 1,
        warehouseID: 2,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2024-07-15'),
        completionDate: new Date('2024-09-30'),
        name: "Kit Escolar para Todos",
        organizerNic: '511124359',
        status: 3,
        warehouseID: 3,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        startDate: new Date('2023-11-01'),
        completionDate: new Date('2024-01-10'),
        name: "Doações de Inverno",
        organizerNic: '111479985',
        status: 3,
        warehouseID: 2,
        isActive: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjects', null, {});
  }
};
