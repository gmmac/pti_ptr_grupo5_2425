"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RepairStatuses", [
      { state: "Repair created", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { state: "Equipment on hold", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { state: "Diagnosing equipment", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { state: "Cost Estimate done", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { state: "Repair finished", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { state: "Equipment delivered", isActive: "1", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RepairStatuses", null, {});
  },
};
