"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insere os EquipmentSheets pré-definidos
    await queryInterface.bulkInsert(
      "EquipmentSheets",
      [
        {
          barcode: "12345678901234567890",
          model: 1, // Referência ao modelo "iPhone 15"
          type: 1,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "23456789012345678901",
          model: 2, // "Galaxy S23"
          type: 1,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "34567890123456789012",
          model: 3, // "PlayStation 5"
          type: 3,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "45678901234567890123",
          model: 4, // "XPS 13"
          type: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "56789012345678901234",
          model: 5, // "Spectre x360"
          type: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "67890123456789012345",
          model: 6, // "iPad Pro"
          type: 4,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "78901234567890123456",
          model: 7, // "Galaxy Tab S8"
          type: 4,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "90123456789012345678",
          model: 9, // "Nitendo Switch"
          type: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "90123456789012345679",
          model: 11, // "Nitendo Switch 2"
          type: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Model 12: AirPods Pro (Headphones)
        { barcode: '10000000000000000012', model: 12, type: 6, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 13: MacBook Pro 14 (Laptop)
        { barcode: '10000000000000000013', model: 13, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 14: Galaxy Watch 5 (Smartwatch)
        { barcode: '10000000000000000014', model: 14, type: 5, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 15: Odyssey G9 (Monitor)
        { barcode: '10000000000000000015', model: 15, type: 10, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 16: WH-1000XM5 (Headphones)
        { barcode: '10000000000000000016', model: 16, type: 6, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 17: PlayStation VR2 (Game Console)
        { barcode: '10000000000000000017', model: 17, type: 2, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 18: XPS 15 (Laptop)
        { barcode: '10000000000000000018', model: 18, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 19: Alienware m15 (Laptop)
        { barcode: '10000000000000000019', model: 19, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 20: ENVY 13 (Laptop)
        { barcode: '10000000000000000020', model: 20, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 21: Omen 16 (Laptop)
        { barcode: '10000000000000000021', model: 21, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 22: ThinkPad X1 Carbon (Laptop)
        { barcode: '10000000000000000022', model: 22, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 23: Yoga 9i (Laptop)
        { barcode: '10000000000000000023', model: 23, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 24: ROG Zephyrus G14 (Laptop)
        { barcode: '10000000000000000024', model: 24, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 25: ZenBook 13 (Laptop)
        { barcode: '10000000000000000025', model: 25, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 26: Surface Pro 8 (Laptop)
        { barcode: '10000000000000000026', model: 26, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 27: Surface Laptop 5 (Laptop)
        { barcode: '10000000000000000027', model: 27, type: 4, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 28: Switch Lite (Game Console)
        { barcode: '10000000000000000028', model: 28, type: 2, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 29: NES Classic (Game Console)
        { barcode: '10000000000000000029', model: 29, type: 2, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 30: Hero9 Black (Camera)
        { barcode: '10000000000000000030', model: 30, type: 8, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 31: Hero11 Black (Camera)
        { barcode: '10000000000000000031', model: 31, type: 8, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    // Remove todos os EquipmentSheets criados
    await queryInterface.bulkDelete("EquipmentSheets", null, {});
  },
};
