"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"ActualCarts",
			[
				{
					clientNIC: "123456789",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "987654321",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("ActualCarts", null, {});
	},
};
