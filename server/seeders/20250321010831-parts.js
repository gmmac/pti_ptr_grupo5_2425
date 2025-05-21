"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Parts",
      [
        {
          name: "Iphone 15 Battery",
          equipmentId: "12345678901234567890",
          price: 49.99,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy S23 Battery",
          equipmentId: "23456789012345678901",
          price: 39.99,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Playstation 5 Battery",
          equipmentId: "34567890123456789012",
          price: 39.99,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "XPS13 Battery",
          equipmentId: "45678901234567890123",
          price: 50.50,
          arriveTime: 6, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Spectre x360 Battery",
          equipmentId: "56789012345678901234",
          price: 65.20,
          arriveTime: 6, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPad Pro Battery",
          equipmentId: "67890123456789012345",
          price: 120,
          arriveTime: 6, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Galaxy Tab S8 Battery",
          equipmentId: "78901234567890123456",
          price: 120,
          arriveTime: 6, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch Battery",
          equipmentId: "90123456789012345678",
          price: 120,
          arriveTime: 6, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch 2 Battery",
          equipmentId: "90123456789012345679",
          price: 130,
          arriveTime: 4, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AirPods Pro Battery",
          equipmentId: "10000000000000000012",
          price: 30,
          arriveTime: 4, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MacBook Pro 14 Battery",
          equipmentId: "10000000000000000013",
          price: 30,
          arriveTime: 4, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Galaxy Watch 5 Battery",
          equipmentId: "10000000000000000014",
          price: 50.30,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Odyssey G9 Battery",
          equipmentId: "10000000000000000015",
          price: 50.30,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "WH-1000XM5 Battery",
          equipmentId: "10000000000000000016",
          price: 50.30,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PlayStation VR2 Battery",
          equipmentId: "10000000000000000017",
          price: 120.65,
          arriveTime: 12, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "XPS 15 Battery",
          equipmentId: "10000000000000000018",
          price: 120.65,
          arriveTime: 12, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alienware m15 Battery",
          equipmentId: "10000000000000000019",
          price: 120.65,
          arriveTime: 12, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ENVY 13 Battery",
          equipmentId: "10000000000000000020",
          price: 30.20,
          arriveTime: 3, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Omen 16 Battery",
          equipmentId: "10000000000000000021",
          price: 70.24,
          arriveTime: 7, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ThinkPad X1 Carbon Battery",
          equipmentId: "10000000000000000022",
          price: 20.30,
          arriveTime: 4, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yoga 9i Battery",
          equipmentId: "10000000000000000023",
          price: 70.80,
          arriveTime: 3, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ROG Zephyrus G14 Battery",
          equipmentId: "10000000000000000024",
          price: 70.80,
          arriveTime: 3, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ZenBook 13 Battery",
          equipmentId: "10000000000000000025",
          price: 80.28,
          arriveTime: 3, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Surface Pro 8 Battery",
          equipmentId: "10000000000000000026",
          price: 80.28,
          arriveTime: 3, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Surface Laptop 5 Battery",
          equipmentId: "10000000000000000027",
          price: 40.60,
          arriveTime: 5, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch Lite Battery",
          equipmentId: "10000000000000000028",
          price: 40.60,
          arriveTime: 5, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "NES Classic Battery",
          equipmentId: "10000000000000000029",
          price: 40.60,
          arriveTime: 5, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hero9 Black Battery",
          equipmentId: "10000000000000000030",
          price: 60.23,
          arriveTime: 8, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hero11 Black Battery",
          equipmentId: "10000000000000000031",
          price: 80.50,
          arriveTime: 5, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPhone 15 Screen",
          equipmentId: "12345678901234567890",
          price: 139.9,
          arriveTime: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPad Pro Screen",
          equipmentId: "67890123456789012345",
          price: 199.9,
          arriveTime: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy S23 back glass",
          equipmentId: "23456789012345678901",
          price: 110.5,
          arriveTime: 7,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Parts", null, {});
  },
};
