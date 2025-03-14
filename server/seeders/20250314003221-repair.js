"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Repairs", [
      {
        statusID: 1,
        description: "abcd",
        budget: 700,
        employeeId: 123456789,
        usedEquipmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        statusID: 1,
        description: "sdfsg",
        budget: 500,
        employeeId: 123456789,
        usedEquipmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Repairs", null, {});
  },
};
