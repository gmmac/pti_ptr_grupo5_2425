'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
      { id: 1, name: 'Apple', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Samsung', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Sony', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'LG', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Microsoft', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Xiaomi', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Asus', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Nintendo', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Inserir modelos de equipamentos
    await queryInterface.bulkInsert('EquipmentModels', [
      { name: 'iPhone 12', brand_id: 1, price: 799.99, releaseYear: 2020, createdAt: new Date(), updatedAt: new Date() },
      { name: 'iPhone 13', brand_id: 1, price: 819.99, releaseYear: 2020, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Galaxy S22 Ultra', brand_id: 2, price: 1099.99, releaseYear: 2022, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xiaomi Mi 11', brand_id: 6, price: 699.99, releaseYear: 2021, createdAt: new Date(), updatedAt: new Date() },
      { name: 'PlayStation 5', brand_id: 3, price: 499.99, releaseYear: 2020, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xbox Series X', brand_id: 5, price: 549.99, releaseYear: 2020, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nintendo Switch', brand_id: 8, price: 319.99, releaseYear: 2019, createdAt: new Date(), updatedAt: new Date() },
      { name: 'LG OLED C1', brand_id: 4, price: 1299.99, releaseYear: 2021, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Samsung QLED 8K', brand_id: 2, price: 1399.99, releaseYear: 2021, createdAt: new Date(), updatedAt: new Date() },
      { name: 'MacBook Pro 2022', brand_id: 1, price: 1499.99, releaseYear: 2022, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dell XPS 15', brand_id: 5, price: 1199.99, releaseYear: 2021, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Asus ROG Zephyrus G14', brand_id: 7, price: 1799.99, releaseYear: 2023, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sony WH-1000XM5', brand_id: 3, price: 349.99, releaseYear: 2022, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Apple AirPods Max', brand_id: 1, price: 499.99, releaseYear: 2023, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentModels', null, {});
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
