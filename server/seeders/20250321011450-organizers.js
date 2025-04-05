'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizers', [
      {
        nic: '123456789',
        nif: '987654321',
        birthDate: new Date('1985-04-12'),
        gender: 'M',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@example.com',
        phone: '912345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nic: '987654321',
        nif: '123456789',
        birthDate: new Date('1990-10-05'),
        gender: 'F',
        firstName: 'Maria',
        lastName: 'Fernandes',
        email: 'maria.fernandes@example.com',
        phone: '934567891',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nic: '111222333',
        nif: '444555666',
        birthDate: new Date('1995-01-20'),
        gender: 'M',
        firstName: 'Carlos',
        lastName: 'Oliveira',
        email: 'carlos.oliveira@example.com',
        phone: '965432187',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nic: '122454888',
        nif: '444555216',
        birthDate: new Date('1995-01-20'),
        gender: 'M',
        firstName: 'Organizer',
        lastName: '1',
        email: 'organizer1@email.com',
        phone: '965432137',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizers', null, {});
  }
};
