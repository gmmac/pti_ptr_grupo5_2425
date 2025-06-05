'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Warehouses', [
      {
        name: 'Armazém Central',
        totalSlots: 100,
        availableSlots: 96,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Instalação Norte',
        totalSlots: 50,
        availableSlots: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Depósito Este',
        totalSlots: 80,
        availableSlots: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Armazém Lisboa',
        totalSlots: 120,
        availableSlots: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Centro de Distribuição do Porto',
        totalSlots: 90,
        availableSlots: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Depósito Algarve',
        totalSlots: 60,
        availableSlots: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Armazém Sul',
        totalSlots: 70,
        availableSlots: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Depósito Madeira',
        totalSlots: 40,
        availableSlots: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Centro de Logística Açores',
        totalSlots: 55,
        availableSlots: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Instalação Centro',
        totalSlots: 85,
        availableSlots: 85,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Depósito Douro',
        totalSlots: 45,
        availableSlots: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Armazém Braga',
        totalSlots: 65,
        availableSlots: 65,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Depósito Viana do Castelo',
        totalSlots: 35,
        availableSlots: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Armazém Castelo Branco',
        totalSlots: 50,
        availableSlots: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Centro de Logística Beja',
        totalSlots: 30,
        availableSlots: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      },
      {
        name: 'Depósito Portalegre',
        totalSlots: 25,
        availableSlots: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "1",
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Warehouses', null, {});
  }
};
