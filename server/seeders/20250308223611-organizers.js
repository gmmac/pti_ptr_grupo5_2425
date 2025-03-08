'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizers', [
      {
        nic: '123456789',
        nif: '987654321',
        birthDate: new Date('1980-06-15'),
        gender: 'M',
        name: 'Carlos Mendes',
        email: 'carlos.mendes@example.com',
        phone: '912345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nic: '987654321',
        nif: '123456789',
        birthDate: new Date('1992-08-22'),
        gender: 'F',
        name: 'Mariana Lopes',
        email: 'mariana.lopes@example.com',
        phone: '923456789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nic: '456789123',
        nif: '321654987',
        birthDate: new Date('1985-03-10'),
        gender: 'M',
        name: 'Fernando Silva',
        email: 'fernando.silva@example.com',
        phone: '934567890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizers', null, {});
  }
};
