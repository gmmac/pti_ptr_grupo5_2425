"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [
      {
        nic: '123456789',
        nif: '987654327',
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
	  {
		nic: "123456788",
		nif: "987654321",
		birthDate: "1990-05-15",
		gender: "M",
		firstName: "John",
		lastName: "Doe",
		email: "johndoe@example.com",
		phone: "912345678",
		address: "123 Main Street",
		latitude: "40.712776",
		longitude: "-74.005974",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		nic: "987654321",
		nif: "123456789",
		birthDate: "1985-07-20",
		gender: "F",
		firstName: "Jane",
		lastName: "Smith",
		email: "janesmith@example.com",
		phone: "923456789",
		address: "456 Elm Street",
		latitude: "34.052235",
		longitude: "-118.243683",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
    ])
  },

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Clients", null, {});
	},
};
