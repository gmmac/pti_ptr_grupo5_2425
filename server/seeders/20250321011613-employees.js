'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        nic: '123456789',
        nif: '987654321',
        birthDate: '1990-05-15',
        gender: 'M',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phone: '912345678',
        address: '123 Main Street',
        latitude: '40.712776',
        longitude: '-74.005974',
        role: "2",
        storeNIPC: "987654321",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nic: '987654321',
        nif: '123456789',
        birthDate: '1985-07-20',
        gender: 'F',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@example.com',
        phone: '923456789',
        address: '456 Elm Street',
        latitude: '34.052235',
        longitude: '-118.243683',
        storeNIPC: "987654321",
        role: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};