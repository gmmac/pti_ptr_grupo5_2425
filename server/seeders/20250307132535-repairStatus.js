"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RepairStatuses", [
      { state: "Repair created", createdAt: new Date(), updatedAt: new Date() },
      { state: "Equipment on hold", createdAt: new Date(), updatedAt: new Date() },
      { state: "Diagnosing equipment", createdAt: new Date(), updatedAt: new Date() },
      { state: "Cost Estimate done", createdAt: new Date(), updatedAt: new Date() },
      { state: "Repair finished", createdAt: new Date(), updatedAt: new Date() },
      { state: "Equipment delivered", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RepairStatuses", null, {});
  },
};
