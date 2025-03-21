"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"EquipmentSheets",
			[
				{
					barcode: "12345678901234567890",
					model: 1, // Referência ao modelo "iPhone 15" na tabela EquipmentModels
					type: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "23456789012345678901",
					model: 2, // Referência ao modelo "Galaxy S23" na tabela EquipmentModels
					type: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "34567890123456789012",
					model: 3, // Referência ao modelo "PlayStation 5" na tabela EquipmentModels
					type: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "45678901234567890123",
					model: 4, // Referência ao modelo "XPS 13" na tabela EquipmentModels
					type: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "56789012345678901234",
					model: 5, // Referência ao modelo "Spectre x360" na tabela EquipmentModels
					type: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "67890123456789012345",
					model: 6, // Referência ao modelo "iPad Pro" na tabela EquipmentModels
					type: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "78901234567890123456",
					model: 7, // Referência ao modelo "Galaxy Tab S8" na tabela EquipmentModels
					type: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					barcode: "89012345678901234567",
					model: 8, // Referência ao modelo "Apple Watch Series 9" na tabela EquipmentModels
					type: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("EquipmentSheets", null, {});
	},
};