"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("RepairStatusLogs", [
			{
				statusId: 1,
				description: "Repair order created",
				repairId: 21,
				createdAt: "2025-06-24T19:10:00.065Z",
				updatedAt: "2025-06-24T19:10:00.065Z"
			},
			{
				statusId: 5,
				description: "Orçamento previsto: 350€",
				repairId: 1,
				createdAt: "2025-06-24T19:11:43.351Z",
				updatedAt: "2025-06-24T19:11:43.352Z"
			},
			{
				statusId: 3,
				description: "A aguardar peças",
				repairId: 4,
				createdAt: "2025-06-24T19:12:07.761Z",
				updatedAt: "2025-06-24T19:12:07.761Z"
			},
			{
				statusId: 3,
				description: "A aguardar peças",
				repairId: 3,
				createdAt: "2025-06-24T19:12:24.847Z",
				updatedAt: "2025-06-24T19:12:24.847Z"
			},
			{
				statusId: 4,
				description: "A diagnosticar equipamento",
				repairId: 13,
				createdAt: "2025-06-24T19:12:42.663Z",
				updatedAt: "2025-06-24T19:12:42.663Z"
			},
			{
				statusId: 4,
				description: "A diagnosticar equipamento",
				repairId: 15,
				createdAt: "2025-06-24T19:12:48.365Z",
				updatedAt: "2025-06-24T19:12:48.365Z"
			},
			{
				statusId: 4,
				description: "A diagnosticar equipamento",
				repairId: 16,
				createdAt: "2025-06-24T19:12:55.192Z",
				updatedAt: "2025-06-24T19:12:55.193Z"
			},
			{
				statusId: 4,
				description: "A diagnosticar equipamento",
				repairId: 21,
				createdAt: "2025-06-24T19:13:14.072Z",
				updatedAt: "2025-06-24T19:13:14.072Z"
			},
			{
				statusId: 2,
				description: "Problema resolvido e equipamento entregue na hora ao cliente.",
				repairId: 18,
				createdAt: "2025-06-24T19:13:43.526Z",
				updatedAt: "2025-06-24T19:13:43.527Z"
			}
		]);
	},

	async down(queryInterface, Sequelize) {},
};
