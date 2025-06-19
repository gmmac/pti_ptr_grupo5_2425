"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Interests", [
			{
				clientNic: "895235746",
				brandID: 1,
				modelID: 12,
				typeID: 6,
				equipmentSheetID: "10000000000000000012",
				equipmentStatusID: 3,
				minLaunchYear: 2023,
				maxLaunchYear: 2025,
				minPrice: 50.0,
				maxPrice: 100.0,
				description: null,
				notified: false,
				createdAt: new Date("2025-06-19T14:25:11.975Z"),
				updatedAt: new Date("2025-06-19T14:25:11.975Z"),
			},
			{
				clientNic: "895235746",
				brandID: 1,
				modelID: null,
				typeID: 1,
				equipmentSheetID: null,
				equipmentStatusID: 2,
				minLaunchYear: 2022,
				maxLaunchYear: 2025,
				minPrice: 575.0,
				maxPrice: 850.0,
				description: "Um iphone quase novo e com a bateria em bom estado",
				notified: false,
				createdAt: new Date("2025-06-19T14:41:18.536Z"),
				updatedAt: new Date("2025-06-19T14:41:18.536Z"),
			},
			{
				clientNic: "895235746",
				brandID: null,
				modelID: null,
				typeID: 8,
				equipmentSheetID: null,
				equipmentStatusID: 3,
				minLaunchYear: 2020,
				maxLaunchYear: 2023,
				minPrice: 175.0,
				maxPrice: 375.0,
				description: "Sem preferência na marca",
				notified: false,
				createdAt: new Date("2025-06-19T14:43:17.185Z"),
				updatedAt: new Date("2025-06-19T14:43:17.185Z"),
			},
			{
				clientNic: "895235746",
				brandID: 2,
				modelID: 2,
				typeID: 1,
				equipmentSheetID: "23456789012345678901",
				equipmentStatusID: 2,
				minLaunchYear: null,
				maxLaunchYear: null,
				minPrice: null,
				maxPrice: null,
				description: null,
				notified: false,
				createdAt: new Date("2025-06-19T14:43:47.179Z"),
				updatedAt: new Date("2025-06-19T14:43:47.179Z"),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete();
	},
};
