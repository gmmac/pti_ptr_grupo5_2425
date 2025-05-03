'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Warehouses', [
      {
        name: 'Armazém Central',
        totalSlots: 100,
        availableSlots: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Instalação Norte',
        totalSlots: 50,
        availableSlots: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Depósito Este',
        totalSlots: 80,
        availableSlots: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Armazém Lisboa',
        totalSlots: 120,
        availableSlots: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Centro de Distribuição do Porto',
        totalSlots: 90,
        availableSlots: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Depósito Algarve',
        totalSlots: 60,
        availableSlots: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Warehouses', null, {});
  }
};
