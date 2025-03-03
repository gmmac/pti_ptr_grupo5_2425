'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentTypes', [
      { name: 'Smartphone', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Game Console', createdAt: new Date(), updatedAt: new Date() },
      { name: 'TV', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laptop', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartwatch', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Headphones', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentTypes', null, {});
  }
};
