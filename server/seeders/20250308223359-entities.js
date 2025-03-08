'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Entities', [
      {
        nipc: '123456789',
        telemovel: '912345678',
        nome: 'Empresa Alpha',
        email: 'contato@empresaalpha.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nipc: '987654321',
        telemovel: '923456789',
        nome: 'Empresa Beta',
        email: 'suporte@empresabeta.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nipc: '456789123',
        telemovel: '934567890',
        nome: 'Empresa Gama',
        email: 'info@empresagama.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Entities', null, {});
  }
};
