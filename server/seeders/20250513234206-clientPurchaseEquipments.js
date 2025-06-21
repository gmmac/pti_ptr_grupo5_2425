"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.bulkInsert(
		// 	"PurchaseCartEquipments",
		// 	[
		// 		{
		// 			id: 1,
		// 			equipmentId: 24,
		// 			clientPurchaseId: 1,
		// 			createdAt: new Date("2025-06-20T11:57:59.224Z"),
		// 			updatedAt: new Date("2025-06-20T11:57:59.224Z"),
		// 		},
		// 		{
		// 			id: 2,
		// 			equipmentId: 2,
		// 			clientPurchaseId: 1,
		// 			createdAt: new Date("2025-06-20T11:57:59.231Z"),
		// 			updatedAt: new Date("2025-06-20T11:57:59.231Z"),
		// 		},
		// 		{
		// 			id: 3,
		// 			equipmentId: 34,
		// 			clientPurchaseId: 2,
		// 			createdAt: new Date("2025-06-20T12:00:30.805Z"),
		// 			updatedAt: new Date("2025-06-20T12:00:30.805Z"),
		// 		},
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
