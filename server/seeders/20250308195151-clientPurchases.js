"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"ClientPurchases",
			[
				{
					clientNIC: "123456789", // Refere-se a John Doe
					employeeID: "123456789", // Refere-se a João Silva
					total: 150.75,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "987654321", // Refere-se a Jane Smith
					employeeID: "234567890", // Refere-se a Maria Pereira
					total: 89.99,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "123456789",
					employeeID: "345678901", // Refere-se a Carlos Sousa
					total: 200.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "987654321",
					employeeID: "456789012", // Refere-se a Ana Costa
					total: 50.5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "123456789",
					employeeID: "567890123", // Refere-se a Pedro Oliveira
					total: 120.0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("ClientPurchases", null, {});
	},
};
