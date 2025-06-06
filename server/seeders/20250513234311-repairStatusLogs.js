"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.bulkInsert("RepairStatusLogs", [
		// 	{
		// 		statusId: 1,
		// 		repairId: 1,
		// 		description: "Equipamento recebido para avaliação",
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 	},

		// 	{
		// 		statusId: 1,
		// 		repairId: 2,
		// 		description: "Equipamento recebido para avaliação",
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 	},

		// 	{
		// 		statusId: 1,
		// 		repairId: 3,
		// 		description: "Equipamento recebido para avaliação",
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 	},

		// 	{
		// 		statusId: 5,
		// 		repairId: 3,
		// 		description: "Equipamento reparado. Substituída porta usb-c",
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 	},
		// ]);
	},

	async down(queryInterface, Sequelize) {},
};
