"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RepairStatuses", [
      { state: "Repair Created", createdAt: new Date(), updatedAt: new Date() },
      { state: "Equipment On Hold", createdAt: new Date(), updatedAt: new Date() },
      { state: "Diagnosing Equipment", createdAt: new Date(), updatedAt: new Date() },
      { state: "Cost Estimate Done", createdAt: new Date(), updatedAt: new Date() },
      { state: "Repair Finished", createdAt: new Date(), updatedAt: new Date() },
      { state: "Equipment Delivered", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RepairStatuses", null, {});
  },
};
