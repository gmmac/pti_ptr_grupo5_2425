"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"EquipmentStatuses",
			[
				{ state: "New", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Barely Used", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Used", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Damaged", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Broken", createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("EquipmentStatuses", null, {});
	},
};
