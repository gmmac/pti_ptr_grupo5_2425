"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"EquipmentStatuses",
			[
				{
					state: "novo",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					state: "usado",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					state: "defeito",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					state: "avariado",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("EquipmentStatuses", null, {});
	},
};
