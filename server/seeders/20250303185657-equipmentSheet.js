'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentSheets', [
      { barcode: '123456789012', price: 799.99, model: 1, releaseYear: 2020, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789013', price: 819.99, model: 1, releaseYear: 2020, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789014', price: 849.99, model: 1, releaseYear: 2020, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789015', price: 899.99, model: 2, releaseYear: 2021, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789016', price: 929.99, model: 2, releaseYear: 2021, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789017', price: 1099.99, model: 3, releaseYear: 2022, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789018', price: 1129.99, model: 3, releaseYear: 2022, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789019', price: 1199.99, model: 3, releaseYear: 2022, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789020', price: 699.99, model: 4, releaseYear: 2021, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789021', price: 499.99, model: 5, releaseYear: 2020, type: 2, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789022', price: 549.99, model: 5, releaseYear: 2020, type: 2, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789023', price: 499.99, model: 6, releaseYear: 2020, type: 2, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789024', price: 299.99, model: 7, releaseYear: 2019, type: 2, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789025', price: 319.99, model: 7, releaseYear: 2019, type: 2, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789026', price: 1299.99, model: 8, releaseYear: 2021, type: 3, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789027', price: 1399.99, model: 8, releaseYear: 2021, type: 3, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789028', price: 1099.99, model: 9, releaseYear: 2022, type: 3, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789029', price: 1499.99, model: 10, releaseYear: 2022, type: 4, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789030', price: 1599.99, model: 10, releaseYear: 2022, type: 4, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789031', price: 1199.99, model: 11, releaseYear: 2021, type: 4, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789032', price: 1799.99, model: 12, releaseYear: 2023, type: 4, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789033', price: 349.99, model: 13, releaseYear: 2022, type: 5, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789034', price: 299.99, model: 14, releaseYear: 2021, type: 5, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789035', price: 499.99, model: 14, releaseYear: 2023, type: 5, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentSheets', null, {});
  }
};
