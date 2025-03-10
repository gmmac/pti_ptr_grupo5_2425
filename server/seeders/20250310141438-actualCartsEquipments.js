"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"ActualCartEquipments",
			[
				{
					equipmentId: 1, // Ajuste conforme os IDs reais dos equipamentos
					cartId: 1, // Ajuste conforme os IDs reais dos carrinhos
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					equipmentId: 2,
					cartId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					equipmentId: 3,
					cartId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					equipmentId: 4,
					cartId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("ActualCartEquipments", null, {});
	},
};
