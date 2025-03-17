'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentSheets', [
      { barcode: '123456789012',  model: 1, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789013',  model: 1, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789014',  model: 1, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789015',  model: 2, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789016',  model: 2, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789017', model: 3, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789018', model: 3, type: 1, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789019', model: 3, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789020',  model: 4, type: 1, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789021',  model: 5, type: 2, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789022',  model: 5, type: 2, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789023',  model: 6, type: 2, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789024',  model: 7, type: 2, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789025',  model: 7, type: 2, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789026', model: 8, type: 3, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789027', model: 8, type: 3, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789028', model: 9, type: 3, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789029', model: 10, type: 4, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789030', model: 10, type: 4, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789031', model: 11, type: 4, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789032', model: 12, type: 4, createdAt: new Date(), updatedAt: new Date() },

      { barcode: '123456789033',  model: 13, type: 5, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789034',  model: 14, type: 5, createdAt: new Date(), updatedAt: new Date() },
      { barcode: '123456789035',  model: 14, type: 5, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentSheets', null, {});
  }
};
