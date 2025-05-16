"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("OrderStatuses", [
			{
				state: "Pending Approval",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{ state: "Preparing", createdAt: new Date(), updatedAt: new Date() },
			{ state: "Dispached", createdAt: new Date(), updatedAt: new Date() },
			{ state: "Received", createdAt: new Date(), updatedAt: new Date() },
			{ state: "Canceled", createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("OrderStatuses", null, {});
	},
};
