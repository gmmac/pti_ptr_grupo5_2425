'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentStatuses', [
      { state: 'Available', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Sold', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Reserved', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Under Maintenance', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Damaged', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentStatuses', null, {});
  }
};
