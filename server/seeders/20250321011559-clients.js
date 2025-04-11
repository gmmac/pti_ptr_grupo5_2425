'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [
      {
        nic: '123456789',
        nif: '987654321',
        birthDate: new Date('2004-02-07'), 
        gender: 'M', // 'M' para masculino, 'F' para feminino
        firstName: 'Diogo',
        lastName: 'Roque',
        email: 'diogorq2@gmail.com',
        phone: '123456789',
        address: '', 
        latitude: '', 
        longitude: '', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {

  }
};
