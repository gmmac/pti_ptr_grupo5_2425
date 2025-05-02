"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "EquipmentModels",
      [
        {
          name: "iPhone 15",
          price: 999.99,
          releaseYear: 2023,
          brand_id: 1, // Apple
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Galaxy S23",
          price: 899.99,
          releaseYear: 2023,
          brand_id: 2, // Samsung
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PlayStation 5",
          price: 499.99,
          releaseYear: 2020,
          brand_id: 3, // Sony
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "XPS 13",
          price: 1199.99,
          releaseYear: 2022,
          brand_id: 4, // Dell
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Spectre x360",
          price: 1299.99,
          releaseYear: 2022,
          brand_id: 5, // HP
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPad Pro",
          price: 1099.99,
          releaseYear: 2023,
          brand_id: 1, // Apple
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Galaxy Tab S8",
          price: 799.99,
          releaseYear: 2023,
          brand_id: 2, // Samsung
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apple Watch Series 9",
          price: 399.99,
          releaseYear: 2023,
          brand_id: 1, // Apple
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EquipmentModels", null, {});
  },
};
