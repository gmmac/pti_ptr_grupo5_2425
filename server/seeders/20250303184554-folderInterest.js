'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FolderInterests', [
      { name: 'C1', clientNIC: '123456789', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C2', clientNIC: '987654321', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C3', clientNIC: '123456789', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C4', clientNIC: '987654321', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C5', clientNIC: '123456789', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C6', clientNIC: '987654321', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C7', clientNIC: '123456789', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C8', clientNIC: '987654321', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C9', clientNIC: '123456789', createdAt: new Date(), updatedAt: new Date() },
      { name: 'C10', clientNIC: '987654321', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FolderInterests', null, {});
  }
};
