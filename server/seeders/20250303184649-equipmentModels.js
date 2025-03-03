'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentModels', [
      { name: 'iPhone 12', brand_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'iPhone 13', brand_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Galaxy S22 Ultra', brand_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xiaomi Mi 11', brand_id: 6, createdAt: new Date(), updatedAt: new Date() },

      { name: 'PlayStation 5', brand_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xbox Series X', brand_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nintendo Switch', brand_id: 8, createdAt: new Date(), updatedAt: new Date() },

      { name: 'LG OLED C1', brand_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Samsung QLED 8K', brand_id: 2, createdAt: new Date(), updatedAt: new Date() },

      { name: 'MacBook Pro 2022', brand_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dell XPS 15', brand_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Asus ROG Zephyrus G14', brand_id: 7, createdAt: new Date(), updatedAt: new Date() },

      { name: 'Sony WH-1000XM5', brand_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Apple AirPods Max', brand_id: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentModels', null, {});
  }
};
