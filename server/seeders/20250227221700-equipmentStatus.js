"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"EquipmentStatuses",
			[
				{ state: "New", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Barely Used", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Used", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Damaged", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
				{ state: "Broken", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("EquipmentStatuses", null, {});
	},
};
