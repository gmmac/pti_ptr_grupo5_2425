'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Interests', [
      { equipmentSheetID: '123456789012', folderInterestID: 1, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789013', folderInterestID: 1, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789014', folderInterestID: 1, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789015', folderInterestID: 1, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789016', folderInterestID: 1, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789017', folderInterestID: 1, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789012', folderInterestID: 3, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789017', folderInterestID: 3, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789024', folderInterestID: 3, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789021', folderInterestID: 4, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789022', folderInterestID: 4, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789023', folderInterestID: 4, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789024', folderInterestID: 5, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789025', folderInterestID: 5, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789026', folderInterestID: 5, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789027', folderInterestID: 6, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789028', folderInterestID: 6, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789029', folderInterestID: 6, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789030', folderInterestID: 7, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789031', folderInterestID: 7, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789032', folderInterestID: 7, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789033', folderInterestID: 8, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789034', folderInterestID: 8, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789035', folderInterestID: 8, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789015', folderInterestID: 9, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789017', folderInterestID: 9, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789023', folderInterestID: 9, createdAt: new Date(), updatedAt: new Date() },

      { equipmentSheetID: '123456789029', folderInterestID: 10, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789021', folderInterestID: 10, createdAt: new Date(), updatedAt: new Date() },
      { equipmentSheetID: '123456789035', folderInterestID: 10, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Interests', null, {});
  }
};
