"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Brands",
      [
        {
          name: "Apple",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sony",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nitendo",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GoPro",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
