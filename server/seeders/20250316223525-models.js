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
          name: "Watch Series 9",
          price: 399.99,
          releaseYear: 2023,
          brand_id: 1, // Apple
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch",
          price: 450.99,
          releaseYear: 2017,
          brand_id: 9, // Nitendo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch OLED",
          price: 399.99,
          releaseYear: 2021,
          brand_id: 9, // Nitendo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Switch 2",
          price: 499.99,
          releaseYear: 2025,
          brand_id: 9, // Nitendo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AirPods Pro",
          price: 249.99,
          releaseYear: 2019,
          brand_id: 1, // Apple
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MacBook Pro 14",
          price: 1999.99,
          releaseYear: 2023,
          brand_id: 1, // Apple
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Samsung
        {
          name: "Galaxy Watch 5",
          price: 299.99,
          releaseYear: 2022,
          brand_id: 2, // Samsung
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Odyssey G9",
          price: 1599.99,
          releaseYear: 2021,
          brand_id: 2, // Samsung
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Sony
        {
          name: "WH-1000XM5",
          price: 349.99,
          releaseYear: 2022,
          brand_id: 3, // Sony
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PlayStation VR2",
          price: 549.99,
          releaseYear: 2023,
          brand_id: 3, // Sony
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Dell
        {
          name: "XPS 15",
          price: 1499.99,
          releaseYear: 2023,
          brand_id: 4, // Dell
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alienware m15",
          price: 2199.99,
          releaseYear: 2022,
          brand_id: 4, // Dell
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // HP
        {
          name: "ENVY 13",
          price: 1199.99,
          releaseYear: 2021,
          brand_id: 5, // HP
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Omen 16",
          price: 1399.99,
          releaseYear: 2022,
          brand_id: 5, // HP
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Lenovo (novos)
        {
          name: "ThinkPad X1 Carbon",
          price: 1299.99,
          releaseYear: 2023,
          brand_id: 6, // Lenovo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yoga 9i",
          price: 1399.99,
          releaseYear: 2022,
          brand_id: 6, // Lenovo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Asus
        {
          name: "ROG Zephyrus G14",
          price: 1499.99,
          releaseYear: 2023,
          brand_id: 7, // Asus
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ZenBook 13",
          price: 999.99,
          releaseYear: 2022,
          brand_id: 7, // Asus
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Microsoft
        {
          name: "Surface Pro 8",
          price: 1099.99,
          releaseYear: 2021,
          brand_id: 8, // Microsoft
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Surface Laptop 5",
          price: 1299.99,
          releaseYear: 2023,
          brand_id: 8, // Microsoft
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Nintendo
        {
          name: "Switch Lite",
          price: 199.99,
          releaseYear: 2019,
          brand_id: 9, // Nitendo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "NES Classic",
          price: 59.99,
          releaseYear: 2016,
          brand_id: 9, // Nitendo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // GoPro
        {
          name: "Hero9 Black",
          price: 299.99,
          releaseYear: 2020,
          brand_id: 10, // GoPro
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hero11 Black",
          price: 399.99,
          releaseYear: 2022,
          brand_id: 10, // GoPro
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Xiaomi
        {
          name: "Redmi Note 11",
          price: 229.99,
          releaseYear: 2022,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mi Pad 5",
          price: 349.99,
          releaseYear: 2021,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mi Smart Band 6",
          price: 49.99,
          releaseYear: 2021,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Corsair
        {
          name: "Void RGB Elite",
          price: 89.99,
          releaseYear: 2020,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "K70 RGB MK.2",
          price: 159.99,
          releaseYear: 2019,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dark Core RGB Pro",
          price: 79.99,
          releaseYear: 2021,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // JBL
        {
          name: "Flip 5",
          price: 119.99,
          releaseYear: 2019,
          brand_id: 13,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pulse 4",
          price: 149.99,
          releaseYear: 2020,
          brand_id: 13,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bar 5.1 Surround",
          price: 499.99,
          releaseYear: 2021,
          brand_id: 13,
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
