"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"EquipmentTypes",
			[
				{
					name: "Smartphone",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Laptop",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Gaming Console",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Tablet",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Smartwatch",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("EquipmentTypes", null, {});
	},
};
