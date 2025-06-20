"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("PreferredStoresInterets", [
			{
				storeId: "123456789",
				interestId: 1,
				createdAt: new Date("2025-06-19T14:25:11.982Z"),
				updatedAt: new Date("2025-06-19T14:25:11.982Z"),
			},
			{
				storeId: "223344556",
				interestId: 1,
				createdAt: new Date("2025-06-19T14:25:11.984Z"),
				updatedAt: new Date("2025-06-19T14:25:11.984Z"),
			},
			{
				storeId: "334455667",
				interestId: 1,
				createdAt: new Date("2025-06-19T14:25:11.985Z"),
				updatedAt: new Date("2025-06-19T14:25:11.985Z"),
			},
			{
				storeId: "334455667",
				interestId: 2,
				createdAt: new Date("2025-06-19T14:41:18.572Z"),
				updatedAt: new Date("2025-06-19T14:41:18.572Z"),
			},
			{
				storeId: "223344556",
				interestId: 2,
				createdAt: new Date("2025-06-19T14:41:18.574Z"),
				updatedAt: new Date("2025-06-19T14:41:18.574Z"),
			},
			{
				storeId: "445566778",
				interestId: 4,
				createdAt: new Date("2025-06-19T14:43:47.182Z"),
				updatedAt: new Date("2025-06-19T14:43:47.182Z"),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete();
	},
};
