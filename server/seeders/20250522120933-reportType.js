'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ReportTypes", [
      { name: "Sales", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: "Purchases", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: "Repairs", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: "Charity Projects", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: "Interests", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
