"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("StorePurchases", [
      {
        id: 1,
        storeID: "112233445",
        clientNIC: "123456789",
        employeeID: "364611960",
        purchasePrice: 1111.0,
        usedEquipmentID: 1,
        createdAt: new Date("2025-06-21T01:53:06.595Z"),
        updatedAt: new Date("2025-06-21T01:53:06.596Z")
      },
      {
        id: 2,
        storeID: "112233445",
        clientNIC: "222444888",
        employeeID: "364611960",
        purchasePrice: 200.0,
        usedEquipmentID: 2,
        createdAt: new Date("2025-06-21T01:53:18.975Z"),
        updatedAt: new Date("2025-06-21T01:53:18.975Z")
      },
      {
        id: 3,
        storeID: "112233445",
        clientNIC: "222444888",
        employeeID: "364611960",
        purchasePrice: 220.29,
        usedEquipmentID: 3,
        createdAt: new Date("2025-06-21T01:53:30.277Z"),
        updatedAt: new Date("2025-06-21T01:53:30.277Z")
      },
      {
        id: 4,
        storeID: "112233445",
        clientNIC: "123456789",
        employeeID: "364611960",
        purchasePrice: 810.99,
        usedEquipmentID: 4,
        createdAt: new Date("2025-06-21T01:53:48.094Z"),
        updatedAt: new Date("2025-06-21T01:53:48.094Z")
      },
      {
        id: 5,
        storeID: "112233445",
        clientNIC: "259373971",
        employeeID: "364611960",
        purchasePrice: 620.99,
        usedEquipmentID: 5,
        createdAt: new Date("2025-06-21T01:54:02.013Z"),
        updatedAt: new Date("2025-06-21T01:54:02.013Z")
      },
      {
        id: 6,
        storeID: "112233445",
        clientNIC: "593069771",
        employeeID: "364611960",
        purchasePrice: 86.99,
        usedEquipmentID: 6,
        createdAt: new Date("2025-06-21T01:54:20.982Z"),
        updatedAt: new Date("2025-06-21T01:54:20.982Z")
      },
      {
        id: 7,
        storeID: "112233445",
        clientNIC: "895235746",
        employeeID: "364611960",
        purchasePrice: 240.85,
        usedEquipmentID: 7,
        createdAt: new Date("2025-06-21T01:54:48.567Z"),
        updatedAt: new Date("2025-06-21T01:54:48.567Z")
      },
      {
        id: 8,
        storeID: "112233445",
        clientNIC: "123456789",
        employeeID: "364611960",
        purchasePrice: 1375.99,
        usedEquipmentID: 8,
        createdAt: new Date("2025-06-21T01:55:30.175Z"),
        updatedAt: new Date("2025-06-21T01:55:30.175Z")
      },
      {
        id: 9,
        storeID: "112233445",
        clientNIC: "123456789",
        employeeID: "364611960",
        purchasePrice: 12.19,
        usedEquipmentID: 9,
        createdAt: new Date("2025-06-21T01:56:15.048Z"),
        updatedAt: new Date("2025-06-21T01:56:15.048Z")
      },
      {
        id: 10,
        storeID: "112233445",
        clientNIC: "123456789",
        employeeID: "364611960",
        purchasePrice: 370.99,
        usedEquipmentID: 10,
        createdAt: new Date("2025-06-21T01:56:45.620Z"),
        updatedAt: new Date("2025-06-21T01:56:45.620Z")
      },
      {
        id: 11,
        storeID: "486371589",
        clientNIC: "222444888",
        employeeID: "123355888",
        purchasePrice: 750.0,
        usedEquipmentID: 11,
        createdAt: new Date("2025-06-21T01:58:31.109Z"),
        updatedAt: new Date("2025-06-21T01:58:31.109Z")
      },
      {
        id: 12,
        storeID: "486371589",
        clientNIC: "686189004",
        employeeID: "123355888",
        purchasePrice: 1275.99,
        usedEquipmentID: 12,
        createdAt: new Date("2025-06-21T02:08:27.333Z"),
        updatedAt: new Date("2025-06-21T02:08:27.333Z")
      },
      {
        id: 13,
        storeID: "486371589",
        clientNIC: "593069771",
        employeeID: "123355888",
        purchasePrice: 38.55,
        usedEquipmentID: 13,
        createdAt: new Date("2025-06-21T02:08:50.044Z"),
        updatedAt: new Date("2025-06-21T02:08:50.044Z")
      },
      {
        id: 14,
        storeID: "486371589",
        clientNIC: "222444888",
        employeeID: "123355888",
        purchasePrice: 986.99,
        usedEquipmentID: 14,
        createdAt: new Date("2025-06-21T02:31:27.499Z"),
        updatedAt: new Date("2025-06-21T02:31:27.500Z")
      },
      {
        id: 15,
        storeID: "486371589",
        clientNIC: "281706294",
        employeeID: "123355888",
        purchasePrice: 199.99,
        usedEquipmentID: 15,
        createdAt: new Date("2025-06-21T02:31:43.838Z"),
        updatedAt: new Date("2025-06-21T02:31:43.838Z")
      },
      {
        id: 16,
        storeID: "486371589",
        clientNIC: "222444888",
        employeeID: "123355888",
        purchasePrice: 213.87,
        usedEquipmentID: 16,
        createdAt: new Date("2025-06-21T02:32:00.847Z"),
        updatedAt: new Date("2025-06-21T02:32:00.847Z")
      },
      {
        id: 17,
        storeID: "486371589",
        clientNIC: "325778543",
        employeeID: "123355888",
        purchasePrice: 913.85,
        usedEquipmentID: 17,
        createdAt: new Date("2025-06-21T02:32:24.662Z"),
        updatedAt: new Date("2025-06-21T02:32:24.662Z")
      },
      {
        id: 18,
        storeID: "486371589",
        clientNIC: "259373971",
        employeeID: "123355888",
        purchasePrice: 1750.99,
        usedEquipmentID: 18,
        createdAt: new Date("2025-06-21T02:34:29.811Z"),
        updatedAt: new Date("2025-06-21T02:34:29.811Z")
      },
      {
        id: 19,
        storeID: "486371589",
        clientNIC: "123456789",
        employeeID: "123355888",
        purchasePrice: 110.99,
        usedEquipmentID: 19,
        createdAt: new Date("2025-06-21T02:35:01.028Z"),
        updatedAt: new Date("2025-06-21T02:35:01.028Z")
      },
      {
        id: 20,
        storeID: "486371589",
        clientNIC: "563578298",
        employeeID: "123355888",
        purchasePrice: 615.0,
        usedEquipmentID: 20,
        createdAt: new Date("2025-06-21T02:35:43.005Z"),
        updatedAt: new Date("2025-06-21T02:35:43.005Z")
      },
      {
        id: 21,
        storeID: "486371589",
        clientNIC: "488341679",
        employeeID: "123355888",
        purchasePrice: 776.0,
        usedEquipmentID: 21,
        createdAt: new Date("2025-06-21T02:35:58.407Z"),
        updatedAt: new Date("2025-06-21T02:35:58.407Z")
      },
      {
        id: 22,
        storeID: "486371589",
        clientNIC: "488341679",
        employeeID: "123355888",
        purchasePrice: 699.0,
        usedEquipmentID: 22,
        createdAt: new Date("2025-06-21T02:36:17.682Z"),
        updatedAt: new Date("2025-06-21T02:36:17.682Z")
      },
      {
        id: 23,
        storeID: "223344556",
        clientNIC: "593069771",
        employeeID: "109283746",
        purchasePrice: 97.99,
        usedEquipmentID: 23,
        createdAt: new Date("2025-06-21T02:44:54.618Z"),
        updatedAt: new Date("2025-06-21T02:44:54.618Z")
      },
      {
        id: 24,
        storeID: "223344556",
        clientNIC: "488341679",
        employeeID: "109283746",
        purchasePrice: 288.1,
        usedEquipmentID: 24,
        createdAt: new Date("2025-06-21T02:45:18.918Z"),
        updatedAt: new Date("2025-06-21T02:45:18.918Z")
      },
      {
        id: 25,
        storeID: "223344556",
        clientNIC: "259373971",
        employeeID: "109283746",
        purchasePrice: 275.0,
        usedEquipmentID: 25,
        createdAt: new Date("2025-06-21T02:46:05.405Z"),
        updatedAt: new Date("2025-06-21T02:46:05.405Z")
      },
      {
        id: 26,
        storeID: "223344556",
        clientNIC: "895235746",
        employeeID: "109283746",
        purchasePrice: 615.0,
        usedEquipmentID: 26,
        createdAt: new Date("2025-06-21T02:46:27.002Z"),
        updatedAt: new Date("2025-06-21T02:46:27.002Z")
      },
      {
        id: 27,
        storeID: "223344556",
        clientNIC: "158218186",
        employeeID: "109283746",
        purchasePrice: 715.0,
        usedEquipmentID: 27,
        createdAt: new Date("2025-06-21T02:46:46.110Z"),
        updatedAt: new Date("2025-06-21T02:46:46.110Z")
      },
      {
        id: 28,
        storeID: "223344556",
        clientNIC: "158218186",
        employeeID: "109283746",
        purchasePrice: 275.5,
        usedEquipmentID: 28,
        createdAt: new Date("2025-06-21T02:47:03.410Z"),
        updatedAt: new Date("2025-06-21T02:47:03.410Z")
      },
      {
        id: 29,
        storeID: "223344556",
        clientNIC: "165538245",
        employeeID: "109283746",
        purchasePrice: 1599.0,
        usedEquipmentID: 29,
        createdAt: new Date("2025-06-21T02:47:21.670Z"),
        updatedAt: new Date("2025-06-21T02:47:21.670Z")
      },
      {
        id: 30,
        storeID: "223344556",
        clientNIC: "505202083",
        employeeID: "109283746",
        purchasePrice: 999.99,
        usedEquipmentID: 30,
        createdAt: new Date("2025-06-21T02:47:41.888Z"),
        updatedAt: new Date("2025-06-21T02:47:41.888Z")
      },
      {
        id: 31,
        storeID: "223344556",
        clientNIC: "895235746",
        employeeID: "109283746",
        purchasePrice: 110.15,
        usedEquipmentID: 31,
        createdAt: new Date("2025-06-21T02:48:24.253Z"),
        updatedAt: new Date("2025-06-21T02:48:24.253Z")
      },
      {
        id: 32,
        storeID: "223344556",
        clientNIC: "123456789",
        employeeID: "109283746",
        purchasePrice: 1010.99,
        usedEquipmentID: 32,
        createdAt: new Date("2025-06-21T02:48:53.637Z"),
        updatedAt: new Date("2025-06-21T02:48:53.637Z")
      },
      {
        id: 33,
        storeID: "223344556",
        clientNIC: "165538245",
        employeeID: "109283746",
        purchasePrice: 49.99,
        usedEquipmentID: 33,
        createdAt: new Date("2025-06-21T02:49:51.632Z"),
        updatedAt: new Date("2025-06-21T02:49:51.632Z")
      },
      {
        id: 34,
        storeID: "223344556",
        clientNIC: "895235746",
        employeeID: "109283746",
        purchasePrice: 809.99,
        usedEquipmentID: 34,
        createdAt: new Date("2025-06-21T02:50:32.781Z"),
        updatedAt: new Date("2025-06-21T02:50:32.781Z")
      },
      {
        id: 35,
        storeID: "987654321",
        clientNIC: "165538245",
        employeeID: "948302715",
        purchasePrice: 425.0,
        usedEquipmentID: 35,
        createdAt: new Date("2025-06-21T02:53:19.318Z"),
        updatedAt: new Date("2025-06-21T02:53:19.318Z")
      },
      {
        id: 36,
        storeID: "987654321",
        clientNIC: "165538245",
        employeeID: "948302715",
        purchasePrice: 329.0,
        usedEquipmentID: 36,
        createdAt: new Date("2025-06-21T02:53:42.250Z"),
        updatedAt: new Date("2025-06-21T02:53:42.250Z")
      },
      {
        id: 37,
        storeID: "987654321",
        clientNIC: "230980157",
        employeeID: "948302715",
        purchasePrice: 1067.99,
        usedEquipmentID: 37,
        createdAt: new Date("2025-06-21T02:54:09.273Z"),
        updatedAt: new Date("2025-06-21T02:54:09.273Z")
      },
      {
        id: 38,
        storeID: "987654321",
        clientNIC: "505202083",
        employeeID: "948302715",
        purchasePrice: 315.0,
        usedEquipmentID: 38,
        createdAt: new Date("2025-06-21T02:54:23.424Z"),
        updatedAt: new Date("2025-06-21T02:54:23.424Z")
      },
      {
        id: 39,
        storeID: "987654321",
        clientNIC: "563578298",
        employeeID: "948302715",
        purchasePrice: 215.1,
        usedEquipmentID: 39,
        createdAt: new Date("2025-06-21T02:54:48.090Z"),
        updatedAt: new Date("2025-06-21T02:54:48.090Z")
      },
      {
        id: 40,
        storeID: "987654321",
        clientNIC: "505202083",
        employeeID: "948302715",
        purchasePrice: 1110.52,
        usedEquipmentID: 40,
        createdAt: new Date("2025-06-21T02:55:09.550Z"),
        updatedAt: new Date("2025-06-21T02:55:09.550Z")
      },
      {
        id: 41,
        storeID: "987654321",
        clientNIC: "895235746",
        employeeID: "948302715",
        purchasePrice: 115.15,
        usedEquipmentID: 41,
        createdAt: new Date("2025-06-21T02:55:56.354Z"),
        updatedAt: new Date("2025-06-21T02:55:56.354Z")
      },
      {
        id: 42,
        storeID: "987654321",
        clientNIC: "325778543",
        employeeID: "948302715",
        purchasePrice: 715.0,
        usedEquipmentID: 42,
        createdAt: new Date("2025-06-21T02:56:23.778Z"),
        updatedAt: new Date("2025-06-21T02:56:23.778Z")
      },
      {
        id: 43,
        storeID: "987654321",
        clientNIC: "123456789",
        employeeID: "948302715",
        purchasePrice: 150.15,
        usedEquipmentID: 43,
        createdAt: new Date("2025-06-21T02:56:45.210Z"),
        updatedAt: new Date("2025-06-21T02:56:45.210Z")
      },
      {
        id: 44,
        storeID: "987654321",
        clientNIC: "222444888",
        employeeID: "948302715",
        purchasePrice: 369.99,
        usedEquipmentID: 44,
        createdAt: new Date("2025-06-21T02:57:12.415Z"),
        updatedAt: new Date("2025-06-21T02:57:12.415Z")
      },
      {
        id: 45,
        storeID: "987654321",
        clientNIC: "281706294",
        employeeID: "948302715",
        purchasePrice: 186.0,
        usedEquipmentID: 45,
        createdAt: new Date("2025-06-21T02:57:40.122Z"),
        updatedAt: new Date("2025-06-21T02:57:40.122Z")
      },
      {
        id: 46,
        storeID: "987654321",
        clientNIC: "165538245",
        employeeID: "948302715",
        purchasePrice: 271.0,
        usedEquipmentID: 46,
        createdAt: new Date("2025-06-21T02:58:10.638Z"),
        updatedAt: new Date("2025-06-21T02:58:10.638Z")
      },
      {
        id: 47,
        storeID: "987654321",
        clientNIC: "593069771",
        employeeID: "948302715",
        purchasePrice: 815.55,
        usedEquipmentID: 47,
        createdAt: new Date("2025-06-21T02:58:50.303Z"),
        updatedAt: new Date("2025-06-21T02:58:50.303Z")
      },
      {
        id: 48,
        storeID: "987654321",
        clientNIC: "082745464",
        employeeID: "948302715",
        purchasePrice: 415.0,
        usedEquipmentID: 48,
        createdAt: new Date("2025-06-21T03:00:21.640Z"),
        updatedAt: new Date("2025-06-21T03:00:21.640Z")
      },
      {
        id: 49,
        storeID: "445566778",
        clientNIC: "192837452",
        employeeID: "384750192",
        purchasePrice: 235.0,
        usedEquipmentID: 49,
        createdAt: new Date("2025-06-21T03:12:11.097Z"),
        updatedAt: new Date("2025-06-21T03:12:11.097Z")
      },
      {
        id: 50,
        storeID: "445566778",
        clientNIC: "123456789",
        employeeID: "384750192",
        purchasePrice: 509.95,
        usedEquipmentID: 50,
        createdAt: new Date("2025-06-21T03:12:41.716Z"),
        updatedAt: new Date("2025-06-21T03:12:41.716Z")
      },
      {
        id: 51,
        storeID: "445566778",
        clientNIC: "165538245",
        employeeID: "384750192",
        purchasePrice: 208.0,
        usedEquipmentID: 51,
        createdAt: new Date("2025-06-21T03:12:59.047Z"),
        updatedAt: new Date("2025-06-21T03:12:59.047Z")
      },
      {
        id: 52,
        storeID: "445566778",
        clientNIC: "222444888",
        employeeID: "384750192",
        purchasePrice: 37.15,
        usedEquipmentID: 52,
        createdAt: new Date("2025-06-21T03:13:30.208Z"),
        updatedAt: new Date("2025-06-21T03:13:30.209Z")
      },
      {
        id: 53,
        storeID: "445566778",
        clientNIC: "238475091",
        employeeID: "384750192",
        purchasePrice: 400.99,
        usedEquipmentID: 53,
        createdAt: new Date("2025-06-21T03:13:52.343Z"),
        updatedAt: new Date("2025-06-21T03:13:52.343Z")
      },
      {
        id: 54,
        storeID: "445566778",
        clientNIC: "238475091",
        employeeID: "384750192",
        purchasePrice: 215.0,
        usedEquipmentID: 54,
        createdAt: new Date("2025-06-21T03:14:08.565Z"),
        updatedAt: new Date("2025-06-21T03:14:08.565Z")
      },
      {
        id: 55,
        storeID: "445566778",
        clientNIC: "384750219",
        employeeID: "384750192",
        purchasePrice: 299.99,
        usedEquipmentID: 55,
        createdAt: new Date("2025-06-21T03:14:36.346Z"),
        updatedAt: new Date("2025-06-21T03:14:36.346Z")
      },
      {
        id: 56,
        storeID: "445566778",
        clientNIC: "505202083",
        employeeID: "384750192",
        purchasePrice: 715.99,
        usedEquipmentID: 56,
        createdAt: new Date("2025-06-21T03:14:51.599Z"),
        updatedAt: new Date("2025-06-21T03:14:51.599Z")
      },
      {
        id: 57,
        storeID: "445566778",
        clientNIC: "401928374",
        employeeID: "384750192",
        purchasePrice: 870.0,
        usedEquipmentID: 57,
        createdAt: new Date("2025-06-21T03:15:21.482Z"),
        updatedAt: new Date("2025-06-21T03:15:21.482Z")
      },
      {
        id: 58,
        storeID: "445566778",
        clientNIC: "593069771",
        employeeID: "384750192",
        purchasePrice: 315.92,
        usedEquipmentID: 58,
        createdAt: new Date("2025-06-21T03:15:56.766Z"),
        updatedAt: new Date("2025-06-21T03:15:56.766Z")
      },
      {
        id: 59,
        storeID: "445566778",
        clientNIC: "503918276",
        employeeID: "384750192",
        purchasePrice: 109.99,
        usedEquipmentID: 59,
        createdAt: new Date("2025-06-21T03:16:16.081Z"),
        updatedAt: new Date("2025-06-21T03:16:16.081Z")
      },
      {
        id: 60,
        storeID: "445566778",
        clientNIC: "563578298",
        employeeID: "384750192",
        purchasePrice: 950.5,
        usedEquipmentID: 60,
        createdAt: new Date("2025-06-21T03:16:48.955Z"),
        updatedAt: new Date("2025-06-21T03:16:48.955Z")
      },
      {
        id: 61,
        storeID: "445566778",
        clientNIC: "505202083",
        employeeID: "384750192",
        purchasePrice: 215.15,
        usedEquipmentID: 61,
        createdAt: new Date("2025-06-21T03:17:32.288Z"),
        updatedAt: new Date("2025-06-21T03:17:32.288Z")
      },
      {
        id: 62,
        storeID: "445566778",
        clientNIC: "192837452",
        employeeID: "748593201",
        purchasePrice: 200.5,
        usedEquipmentID: 62,
        createdAt: new Date("2025-06-21T03:18:43.085Z"),
        updatedAt: new Date("2025-06-21T03:18:43.085Z")
      },
      {
        id: 63,
        storeID: "445566778",
        clientNIC: "686189004",
        employeeID: "748593201",
        purchasePrice: 350.15,
        usedEquipmentID: 63,
        createdAt: new Date("2025-06-21T03:19:01.444Z"),
        updatedAt: new Date("2025-06-21T03:19:01.444Z")
      },
      {
        id: 64,
        storeID: "445566778",
        clientNIC: "158218186",
        employeeID: "748593201",
        purchasePrice: 99.9,
        usedEquipmentID: 64,
        createdAt: new Date("2025-06-21T03:19:20.791Z"),
        updatedAt: new Date("2025-06-21T03:19:20.791Z")
      },
      {
        id: 65,
        storeID: "445566778",
        clientNIC: "082745464",
        employeeID: "748593201",
        purchasePrice: 992.75,
        usedEquipmentID: 65,
        createdAt: new Date("2025-06-21T03:20:03.304Z"),
        updatedAt: new Date("2025-06-21T03:20:03.304Z")
      }
    ]);

await queryInterface.sequelize.query(`
  SELECT setval(
    pg_get_serial_sequence('"StorePurchases"', 'id'),
    (SELECT MAX(id) FROM "StorePurchases")
  );
`);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StorePurchases", null, {});
  }
};
