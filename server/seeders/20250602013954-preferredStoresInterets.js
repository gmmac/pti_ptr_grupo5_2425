"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("PreferredStoresInterets", [
			{
				id: 1,
				storeId: "123456789",
				interestId: 2,
				createdAt: new Date("2025-06-24T17:33:53.994Z"),
				updatedAt: new Date("2025-06-24T17:33:53.994Z"),
			},
			{
				id: 2,
				storeId: "778800112",
				interestId: 2,
				createdAt: new Date("2025-06-24T17:33:53.996Z"),
				updatedAt: new Date("2025-06-24T17:33:53.996Z"),
			},
			{
				id: 3,
				storeId: "556688990",
				interestId: 2,
				createdAt: new Date("2025-06-24T17:33:53.996Z"),
				updatedAt: new Date("2025-06-24T17:33:53.996Z"),
			},
			{
				id: 4,
				storeId: "486371589",
				interestId: 1,
				createdAt: new Date("2025-06-24T17:35:39.212Z"),
				updatedAt: new Date("2025-06-24T17:35:39.212Z"),
			},
			{
				id: 5,
				storeId: "486371589",
				interestId: 5,
				createdAt: new Date("2025-06-24T17:37:49.153Z"),
				updatedAt: new Date("2025-06-24T17:37:49.153Z"),
			},
			{
				id: 6,
				storeId: "486371589",
				interestId: 8,
				createdAt: new Date("2025-06-24T17:38:27.517Z"),
				updatedAt: new Date("2025-06-24T17:38:27.517Z"),
			},
			{
				id: 7,
				storeId: "486371589",
				interestId: 12,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				storeId: "486371589",
				interestId: 11,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete();
	},
};
