"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("FolderInterests", [
			{
				id: 1,
				name: "Apple Products",
				clientNIC: "895235746",
				createdAt: new Date("2025-06-24T17:44:27.603Z"),
				updatedAt: new Date("2025-06-24T17:44:27.603Z"),
			},
			{
				id: 2,
				name: "Laptops",
				clientNIC: "222444888",
				createdAt: new Date("2025-06-24T17:48:19.422Z"),
				updatedAt: new Date("2025-06-24T17:48:19.422Z"),
			},
			{
				id: 3,
				name: "Smartphones",
				clientNIC: "123456789",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				name: "Consoles",
				clientNIC: "123456789",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("FolderInterests", null, {});
	},
};
