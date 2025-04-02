'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
      { name: 'Apple', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Samsung', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sony', createdAt: new Date(), updatedAt: new Date() },
      { name: 'LG', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Microsoft', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xiaomi', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Asus', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nintendo', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
