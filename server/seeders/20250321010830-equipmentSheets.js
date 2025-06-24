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
          type: 2,
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          barcode: "45678901234567890123",
          model: 4, // "XPS 13"
          type: 4,
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
        // Model 32: Xiaomi Redmi Note 11 (Smartphone)
        { barcode: '10000000000000000032', model: 32, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 33: Mi Pad 5 (Smartphone)
        { barcode: '10000000000000000033', model: 33, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 34: Mi Smart Band 6 (Smartwatch)
        { barcode: '10000000000000000034', model: 34, type: 5, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 35: Void RGB Elite (Headphones)
        { barcode: '10000000000000000035', model: 35, type: 6, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 36: Mk2 (Keyboard)
        { barcode: '10000000000000000036', model: 36, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 37: Dark Core RGB Pro (Mouse)
        { barcode: '10000000000000000037', model: 37, type: 14, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 38: Flip 5 (Smartphone)
        { barcode: '10000000000000000038', model: 38, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 39: Pulse 4 (Speaker)
        { barcode: '10000000000000000039', model: 39, type: 11, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 40: Bar 5.1 Surround (Speaker)
        { barcode: '10000000000000000040', model: 40, type: 11, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 41: Corsair K95 RGB Platinum (Keyboard)
        { barcode: '10000000000000000041', model: 41, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 42: Asus ROG Strix Scope (Keyboard)
        { barcode: '10000000000000000042', model: 42, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 43: Dell KB216 Wired Keyboard (Keyboard)
        { barcode: '10000000000000000043', model: 43, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 44: HP K1500 Wired Keyboard (Keyboard)
        { barcode: '10000000000000000044', model: 44, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 45: Microsoft Surface Keyboard (Keyboard)
        { barcode: '10000000000000000045', model: 45, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 46: Corsair K55 RGB (Keyboard)
        { barcode: '10000000000000000046', model: 46, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 47: Corsair Strafe RGB (Keyboard)
        { barcode: '10000000000000000047', model: 47, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 48: Asus ROG Claymore (Keyboard)
        { barcode: '10000000000000000048', model: 48, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 49: Dell KB212-B QuietKey (Keyboard)
        { barcode: '10000000000000000049', model: 49, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 50: HP Pavilion Wireless Keyboard (Keyboard)
        { barcode: '10000000000000000050', model: 50, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 51: Microsoft Ergonomic Keyboard (Keyboard)
        { barcode: '10000000000000000051', model: 51, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 52: Lenovo Legion K500 RGB (Keyboard)
        { barcode: '10000000000000000052', model: 52, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 53: JBL Pro Keyboard (Keyboard)
        { barcode: '10000000000000000053', model: 53, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 54: Xiaomi Yuemi Mechanical Keyboard (Keyboard)
        { barcode: '10000000000000000054', model: 54, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 55: Asus TUF Gaming K1 (Keyboard)
        { barcode: '10000000000000000055', model: 55, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 56: Dell KB520 Quiet Keyboard (Keyboard)
        { barcode: '10000000000000000056', model: 56, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 57: HP Elite Wireless Keyboard (Keyboard)
        { barcode: '10000000000000000057', model: 57, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 58: Lenovo ThinkPad Keyboard (Keyboard)
        { barcode: '10000000000000000058', model: 58, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 59: Asus ROG Strix Flare (Keyboard)
        { barcode: '10000000000000000059', model: 59, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 60: Microsoft Surface Ergonomic Keyboard (Keyboard)
        { barcode: '10000000000000000060', model: 60, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 61: Samsung Smart Keyboard (Keyboard)
        { barcode: '10000000000000000061', model: 61, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 62: Sony PlayStation Keyboard (Keyboard)
        { barcode: '10000000000000000062', model: 62, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 63: Corsair K70 RGB MK.2 (Keyboard)
        { barcode: '10000000000000000063', model: 63, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 64: JBL Wireless Keyboard (Keyboard)
        { barcode: '10000000000000000064', model: 64, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        // Model 65: Xiaomi Mi Mechanical Keyboard (Keyboard)
        { barcode: '10000000000000000065', model: 65, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000066', model: 66, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000067', model: 67, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000068', model: 68, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000069', model: 69, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000070', model: 70, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000071', model: 71, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000072', model: 72, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000073', model: 73, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000074', model: 74, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000075', model: 75, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000076', model: 75, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000077', model: 77, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000078', model: 78, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000079', model: 79, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000080', model: 80, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000081', model: 81, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000082', model: 82, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000083', model: 83, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000084', model: 84, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000085', model: 85, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000086', model: 86, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000087', model: 87, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000088', model: 88, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000089', model: 89, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000090', model: 90, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000091', model: 91, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000092', model: 92, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000093', model: 93, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000094', model: 94, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000095', model: 95, type: 13, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000096', model: 96, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000097', model: 97, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000098', model: 98, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000099', model: 99, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000100', model: 100, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000101', model: 101, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000102', model: 102, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000103', model: 103, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000104', model: 104, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000105', model: 105, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000106', model: 106, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000107', model: 107, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000108', model: 108, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000109', model: 109, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000110', model: 110, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000111', model: 111, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000112', model: 112, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000113', model: 113, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000114', model: 114, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000115', model: 115, type: 3, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000116', model: 116, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000117', model: 117, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000118', model: 118, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000119', model: 119, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000120', model: 120, type: 1, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000121', model: 121, type: 7, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000122', model: 121, type: 7, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000123', model: 123, type: 5, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000124', model: 124, type: 5, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
        { barcode: '10000000000000000125', model: 125, type: 5, isActive: '1', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    // Remove todos os EquipmentSheets criados
    await queryInterface.bulkDelete("EquipmentSheets", null, {});
  },
};
