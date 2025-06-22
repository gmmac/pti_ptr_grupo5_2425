"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.bulkInsert(
		// 	"ClientPurchases",
		// 	[
		// 		{
		// 			id: 1,
		// 			clientNIC: "895235746",
		// 			employeeID: "123456789",
		// 			total: 1079.98,
		// 			orderStatusID: 1,
		// 			address: "",
		// 			storeId: "123456789",
		// 			createdAt: new Date("2025-06-20T11:57:59.179Z"),
		// 			updatedAt: new Date("2025-06-20T11:57:59.179Z"),
		// 		},
		// 		{
		// 			id: 2,
		// 			clientNIC: "895235746",
		// 			employeeID: "123456789",
		// 			total: 2199.99,
		// 			orderStatusID: 1,
		// 			address: "",
		// 			storeId: "123456789",
		// 			createdAt: new Date("2025-06-20T12:00:30.766Z"),
		// 			updatedAt: new Date("2025-06-20T12:00:30.766Z"),
		// 		},
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete();
	},
};
