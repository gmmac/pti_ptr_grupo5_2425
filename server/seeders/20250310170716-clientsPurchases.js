"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"ClientPurchases",
			[
				{
					clientNIC: "123456789",
					employeeID: "234567890",
					total: 500.75,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					clientNIC: "987654321",
					employeeID: "234567890",
					total: 1200.5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("ClientPurchases", null, {});
	},
};
