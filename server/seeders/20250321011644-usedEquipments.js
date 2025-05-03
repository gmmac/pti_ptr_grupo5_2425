"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"UsedEquipments",
			[
				{
					statusID: 1, // Referência ao status "novo" na tabela EquipmentStatuses
					price: 899.99,
					putOnSaleDate: new Date("2024-12-10"),
					purchaseDate: null,
					equipmentId: "12345678901234567890", // Referência ao barcode do equipamento "iPhone 15" na tabela EquipmentSheets
					storeId: "123456789", // Referência ao NIPC da loja "Loja Lisboa" na tabela Stores
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					statusID: 2, // Referência ao status "usado" na tabela EquipmentStatuses
					price: 749.99,
					putOnSaleDate: new Date("2024-12-10"),
					purchaseDate: null,
					equipmentId: "12345678901234567890", // Referência ao barcode do equipamento "iPhone 15" na tabela EquipmentSheets
					storeId: "987654321", // Referência ao NIPC da loja "Loja Porto" na tabela Stores
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					statusID: 3, // defeito
					price: 560.99,
					putOnSaleDate: new Date("2024-12-10"),
					purchaseDate: null,
					equipmentId: "12345678901234567890", // Referência ao barcode do equipamento "iPhone 15" na tabela EquipmentSheets
					storeId: "112233445", // Referência ao NIPC da loja "Loja Coimbra" na tabela Stores
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					statusID: 2, // Referência ao status "usado" na tabela EquipmentStatuses
					price: 799.99,
					putOnSaleDate: new Date("2024-12-10"),
					purchaseDate: new Date("2025-01-10"),
					equipmentId: "23456789012345678901", // Referência ao barcode do equipamento "Galaxy S23" na tabela EquipmentSheets
					storeId: "123456789",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					statusID: 3, // Referência ao status "defeito" na tabela EquipmentStatuses
					price: 199.99,
					putOnSaleDate: new Date("2024-12-10"),
					purchaseDate: null,
					equipmentId: "34567890123456789012", // Referência ao barcode do equipamento "PlayStation 5" na tabela EquipmentSheets
					storeId: "123456789",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					statusID: 4, // Referência ao status "avariado" na tabela EquipmentStatuses
					price: 399.99,
					putOnSaleDate: new Date("2024-12-10"),
					purchaseDate: null,
					equipmentId: "45678901234567890123", // Referência ao barcode do equipamento "XPS 13" na tabela EquipmentSheets
					storeId: "123456789",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("UsedEquipments", null, {});
	},
};
