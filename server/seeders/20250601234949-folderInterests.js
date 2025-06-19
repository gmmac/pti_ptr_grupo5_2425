"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("FolderInterests", [
			{
				name: "Favoritos",
				clientNIC: "895235746",
				createdAt: new Date("2025-06-19T15:01:14.943Z"),
				updatedAt: new Date("2025-06-19T15:01:14.943Z"),
			},
			{
				name: "Smartphones",
				clientNIC: "895235746",
				createdAt: new Date("2025-06-19T15:04:02.758Z"),
				updatedAt: new Date("2025-06-19T15:04:02.758Z"),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete();
	},
};
