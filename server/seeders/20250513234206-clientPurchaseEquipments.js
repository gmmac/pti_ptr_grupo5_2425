"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
      "PurchaseCartEquipments",
      [
        {
          id: 1,
          equipmentId: 24,
          clientPurchaseId: 1,
          createdAt: new Date("2025-06-20T11:57:59.224Z"),
          updatedAt: new Date("2025-06-20T11:57:59.224Z"),
        },
        {
          id: 2,
          equipmentId: 2,
          clientPurchaseId: 1,
          createdAt: new Date("2025-06-20T11:57:59.231Z"),
          updatedAt: new Date("2025-06-20T11:57:59.231Z"),
        },
        {
          id: 3,
          equipmentId: 34,
          clientPurchaseId: 2,
          createdAt: new Date("2025-06-20T12:00:30.805Z"),
          updatedAt: new Date("2025-06-20T12:00:30.805Z"),
        },
        {
          id: 4,
          equipmentId: 11,
          clientPurchaseId: 3,
          createdAt: new Date("2025-06-21T12:10:31.766Z"),
          updatedAt: new Date("2025-06-21T12:10:31.766Z"),
        },
        {
          id: 5,
          equipmentId: 13,
          clientPurchaseId: 4,
          createdAt: new Date("2025-06-21T16:15:30.766Z"),
          updatedAt: new Date("2025-06-21T16:15:30.766Z"),
        },
        {
          id: 6,
          equipmentId: 6,
          clientPurchaseId: 5,
          createdAt: new Date("2025-06-21T18:25:30.766Z"),
          updatedAt: new Date("2025-06-21T18:25:30.766Z"),
        },
        {
          id: 7,
          equipmentId: 27,
          clientPurchaseId: 6,
          createdAt: new Date("2025-06-21T18:35:30.766Z"),
          updatedAt: new Date("2025-06-21T18:35:30.766Z"),
        },
        {
          id: 8,
          equipmentId: 28,
          clientPurchaseId: 6,
          createdAt: new Date("2025-06-21T18:35:30.766Z"),
          updatedAt: new Date("2025-06-21T18:35:30.766Z"),
        },
        {
          id: 9,
          equipmentId: 223,
          clientPurchaseId: 7,
          createdAt: new Date("2025-06-24T11:26:40.486Z"),
          updatedAt: new Date("2025-06-24T11:26:40.486Z"),
        },
      ],
      {}
    );
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
