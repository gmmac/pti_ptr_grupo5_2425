"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("FolderInterestEquipments", [
			{
				id: 1,
				folderInterestId: 1,
				interestId: 1,
				createdAt: new Date("2025-06-24T17:44:34.188Z"),
				updatedAt: new Date("2025-06-24T17:44:34.188Z"),
			},
			{
				id: 2,
				folderInterestId: 1,
				interestId: 3,
				createdAt: new Date("2025-06-24T17:44:35.602Z"),
				updatedAt: new Date("2025-06-24T17:44:35.602Z"),
			},
			{
				id: 3,
				folderInterestId: 2,
				interestId: 7,
				createdAt: new Date("2025-06-24T17:48:25.239Z"),
				updatedAt: new Date("2025-06-24T17:48:25.239Z"),
			},
			{
				id: 4,
				folderInterestId: 4,
				interestId: 11,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				folderInterestId: 3,
				interestId: 12,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				folderInterestId: 3,
				interestId: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				folderInterestId: 3,
				interestId: 13,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("FolderInterestEquipments", null, {});
	},
};
