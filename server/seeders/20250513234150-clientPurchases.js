"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
      "ClientPurchases",
      [
        {
          id: 1,
          clientNIC: "895235746",
          employeeID: "748593201",
          total: 1079.98,
          orderStatusID: 1,
          address: "",
          storeId: "123456789",
          createdAt: new Date("2025-06-20T11:57:59.179Z"),
          updatedAt: new Date("2025-06-20T11:57:59.179Z"),
        },
        {
          id: 2,
          clientNIC: "895235746",
          employeeID: "384750192",
          total: 817.15,
          orderStatusID: 1,
          address: "",
          storeId: "123456789",
          createdAt: new Date("2025-06-20T12:00:30.766Z"),
          updatedAt: new Date("2025-06-20T12:00:30.766Z"),
        },
        {
          id: 3,
          clientNIC: "123456789",
          employeeID: "123355888",
          total: 775.99,
          orderStatusID: 1,
          address: "",
          storeId: "486371589",
          createdAt: new Date("2025-06-21T12:10:30.766Z"),
          updatedAt: new Date("2025-06-21T12:10:30.766Z"),
        },
        {
          id: 4,
          clientNIC: "222444888",
          employeeID: "123355888",
          total: 43.13,
          orderStatusID: 2,
          address: "",
          storeId: "486371589",
          createdAt: new Date("2025-06-21T16:15:30.766Z"),
          updatedAt: new Date("2025-06-21T16:15:30.766Z"),
        },
        {
          id: 5,
          clientNIC: "895235746",
          employeeID: "364611960",
          total: 99.99,
          orderStatusID: 3,
          address: "",
          storeId: "112233445",
          createdAt: new Date("2025-06-21T18:25:30.766Z"),
          updatedAt: new Date("2025-06-21T18:25:30.766Z"),
        },
        {
          id: 6,
          clientNIC: "895235746",
          employeeID: "109283746",
          total: 1037.25,
          orderStatusID: 1,
          address: "",
          storeId: "223344556",
          createdAt: new Date("2025-06-21T18:35:30.766Z"),
          updatedAt: new Date("2025-06-21T18:35:30.766Z"),
        },
        {
          id: 7,
          clientNIC: "686189004",
          employeeID: "222444888",
          total: 749.99,
          orderStatusID: 2,
          address: "",
          storeId: "123456789",
          createdAt: new Date("2025-06-24T11:26:40.486Z"),
          updatedAt: new Date("2025-06-24T11:26:40.486Z"),
        },
      ],
      {}
    );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete();
	},
};
