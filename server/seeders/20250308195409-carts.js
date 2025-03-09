"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Carts",
			[
				{
					clientNIC: "123456789", // Refere-se a John Doe
					clientPurchaseID: 1, // Refere-se a uma compra existente
					usedEquipmentID: 1, // Supondo que existam equipamentos usados na tabela UsedEquipment
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "987654321", // Refere-se a Jane Smith
					clientPurchaseID: 2,
					usedEquipmentID: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "123456789",
					clientPurchaseID: 3,
					usedEquipmentID: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "987654321",
					clientPurchaseID: 4,
					usedEquipmentID: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "123456789",
					clientPurchaseID: 5,
					usedEquipmentID: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Carts", null, {});
	},
};
