"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Parts",
      [
        {
          name: "Battery",
          price: 49.99,
          arriveTime: 10, // 10 days
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPhone 15 Screen",
          price: 139.9,
          arriveTime: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPad 10 Screen",
          price: 199.9,
          arriveTime: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy S23 back glass",
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
