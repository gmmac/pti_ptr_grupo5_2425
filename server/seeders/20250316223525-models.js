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
        {
          name: "Corsair K95 RGB Platinum",
          price: 199.99,
          releaseYear: 2021,
          brand_id: 12, // Corsair
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus ROG Strix Scope",
          price: 159.99,
          releaseYear: 2022,
          brand_id: 7, // Asus
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell KB216 Wired Keyboard",
          price: 29.99,
          releaseYear: 2020,
          brand_id: 4, // Dell
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP K1500 Wired Keyboard",
          price: 25.99,
          releaseYear: 2021,
          brand_id: 5, // HP
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft Surface Keyboard",
          price: 99.99,
          releaseYear: 2022,
          brand_id: 8, // Microsoft
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corsair K55 RGB",
          price: 79.99,
          releaseYear: 2021,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corsair Strafe RGB",
          price: 139.99,
          releaseYear: 2018,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus ROG Claymore",
          price: 229.99,
          releaseYear: 2019,
          brand_id: 7,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell KB212-B QuietKey",
          price: 25.99,
          releaseYear: 2017,
          brand_id: 4,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP Pavilion Wireless Keyboard",
          price: 49.99,
          releaseYear: 2020,
          brand_id: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft Ergonomic Keyboard",
          price: 69.99,
          releaseYear: 2019,
          brand_id: 8,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo Legion K500 RGB",
          price: 89.99,
          releaseYear: 2022,
          brand_id: 6,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "JBL Pro Keyboard",
          price: 99.99,
          releaseYear: 2023,
          brand_id: 13,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xiaomi Yuemi Mechanical Keyboard",
          price: 79.99,
          releaseYear: 2020,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus TUF Gaming K1",
          price: 59.99,
          releaseYear: 2021,
          brand_id: 7,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell KB520 Quiet Keyboard",
          price: 49.99,
          releaseYear: 2022,
          brand_id: 4,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP Elite Wireless Keyboard",
          price: 79.99,
          releaseYear: 2021,
          brand_id: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo ThinkPad Keyboard",
          price: 89.99,
          releaseYear: 2020,
          brand_id: 6,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus ROG Strix Flare",
          price: 159.99,
          releaseYear: 2019,
          brand_id: 7,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft Surface Ergonomic Keyboard",
          price: 129.99,
          releaseYear: 2022,
          brand_id: 8,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Smart Keyboard",
          price: 69.99,
          releaseYear: 2021,
          brand_id: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sony PlayStation Keyboard",
          price: 59.99,
          releaseYear: 2020,
          brand_id: 3,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corsair K70 RGB MK.2",
          price: 179.99,
          releaseYear: 2022,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "JBL Wireless Keyboard",
          price: 99.99,
          releaseYear: 2023,
          brand_id: 13,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xiaomi Mi Mechanical Keyboard",
          price: 89.99,
          releaseYear: 2021,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corsair K100 RGB",
          price: 249.99,
          releaseYear: 2023,
          brand_id: 12, // Corsair
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus ROG Strix Scope RX",
          price: 179.99,
          releaseYear: 2023,
          brand_id: 7, // Asus
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell KM7321W Wireless Keyboard",
          price: 129.99,
          releaseYear: 2022,
          brand_id: 4, // Dell
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP Pavilion Gaming Keyboard",
          price: 69.99,
          releaseYear: 2023,
          brand_id: 5, // HP
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo Legion K500 RGB Pro",
          price: 99.99,
          releaseYear: 2024,
          brand_id: 6, // Lenovo
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft Ergonomic Keyboard 2.0",
          price: 89.99,
          releaseYear: 2023,
          brand_id: 8, // Microsoft
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Smart Keyboard Pro",
          price: 79.99,
          releaseYear: 2023,
          brand_id: 2, // Samsung
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sony PlayStation DualSense Keyboard",
          price: 89.99,
          releaseYear: 2023,
          brand_id: 3, // Sony
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "JBL Wireless Mechanical Keyboard",
          price: 119.99,
          releaseYear: 2024,
          brand_id: 13, // JBL
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xiaomi Mi Wireless Keyboard Pro",
          price: 89.99,
          releaseYear: 2023,
          brand_id: 11, // Xiaomi
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corsair K65 RGB Mini",
          price: 139.99,
          releaseYear: 2024,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus ROG Strix Flare II",
          price: 169.99,
          releaseYear: 2024,
          brand_id: 7,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo ThinkPad TrackPoint Keyboard II",
          price: 109.99,
          releaseYear: 2024,
          brand_id: 6,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP Spectre Wired Keyboard",
          price: 59.99,
          releaseYear: 2023,
          brand_id: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell Premier Multi-Device Keyboard",
          price: 129.99,
          releaseYear: 2023,
          brand_id: 4,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft Surface Keyboard Platinum",
          price: 119.99,
          releaseYear: 2023,
          brand_id: 8,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Smart Keyboard Foldable",
          price: 99.99,
          releaseYear: 2024,
          brand_id: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sony PlayStation Chat Keyboard",
          price: 49.99,
          releaseYear: 2023,
          brand_id: 3,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "JBL SoundBoost Keyboard",
          price: 109.99,
          releaseYear: 2024,
          brand_id: 13,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xiaomi Mi Portable Keyboard",
          price: 49.99,
          releaseYear: 2023,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Corsair K30 RGB Hybrid",
          price: 99.99,
          releaseYear: 2024,
          brand_id: 12,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Asus TUF Gaming K3",
          price: 79.99,
          releaseYear: 2024,
          brand_id: 7,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo Legion MK700",
          price: 139.99,
          releaseYear: 2024,
          brand_id: 6,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP Elite Dragonfly Keyboard",
          price: 149.99,
          releaseYear: 2024,
          brand_id: 5,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dell Alienware AW510K",
          price: 159.99,
          releaseYear: 2024,
          brand_id: 4,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microsoft Designer Compact Keyboard",
          price: 89.99,
          releaseYear: 2024,
          brand_id: 8,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy Keyboard Pro",
          price: 129.99,
          releaseYear: 2024,
          brand_id: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sony PlayStation DualSense Edge Keyboard",
          price: 99.99,
          releaseYear: 2024,
          brand_id: 3,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "JBL Bluetooth Keyboard K400",
          price: 89.99,
          releaseYear: 2023,
          brand_id: 13,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xiaomi Mi Mechanical RGB Keyboard",
          price: 99.99,
          releaseYear: 2024,
          brand_id: 11,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Samsung (brand_id: 2)
        { name: "Samsung Neo QLED 4K QN90D", price: 1899.99, releaseYear: 2024, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung OLED S90D", price: 1699.99, releaseYear: 2024, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung Crystal UHD CU7000", price: 449.99, releaseYear: 2023, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung The Serif QN55LS01B", price: 999.99, releaseYear: 2022, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung QLED Q60C Series", price: 799.99, releaseYear: 2023, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung Neo QLED 8K QN800C", price: 3499.99, releaseYear: 2023, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung The Frame QN65LS03BAFXZA", price: 1499.99, releaseYear: 2023, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung OLED S95D", price: 2899.99, releaseYear: 2024, brand_id: 2, isActive: "1", createdAt: new Date(), updatedAt: new Date() },

        // Sony (brand_id: 3)
        { name: "Sony Bravia 9 Mini LED", price: 3299.99, releaseYear: 2024, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Sony Bravia 8 OLED", price: 2199.99, releaseYear: 2024, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Sony Bravia X80L LED", price: 799.99, releaseYear: 2023, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Sony Bravia A90K OLED", price: 1999.99, releaseYear: 2022, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Sony Bravia XR A80L OLED", price: 1899.99, releaseYear: 2023, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Sony Bravia X90L Full Array LED", price: 1299.99, releaseYear: 2023, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Sony Bravia X75K 4K LED", price: 649.99, releaseYear: 2022, brand_id: 3, isActive: "1", createdAt: new Date(), updatedAt: new Date() },

        // Xiaomi (brand_id: 11)
        { name: "Xiaomi TV Max 86", price: 1999.99, releaseYear: 2022, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi TV A2 Series", price: 299.99, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi TV Q1E 75-inch", price: 999.99, releaseYear: 2022, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi Mi TV P1 55-inch", price: 549.99, releaseYear: 2021, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi Smart TV X Series", price: 699.99, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi 14 Pro", price: 999.00, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Redmi Note 13 Pro+", price: 449.00, releaseYear: 2024, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "POCO X6 Pro", price: 399.00, releaseYear: 2024, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi 13T Pro", price: 699.00, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Redmi 13C", price: 149.00, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Redmi Pad Pro", price: 329.00, releaseYear: 2024, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi Pad 5 Pro 12.4", price: 499.00, releaseYear: 2022, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi Watch 2 Pro", price: 249.00, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Redmi Watch 3 Active", price: 49.00, releaseYear: 2023, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "Xiaomi Smart Band 7 Pro", price: 89.00, releaseYear: 2022, brand_id: 11, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      
      
      
      
      
      
      
      
      
      
      
      
      
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EquipmentModels", null, {});
  },
};
