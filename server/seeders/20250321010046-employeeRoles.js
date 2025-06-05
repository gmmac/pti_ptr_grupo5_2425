'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("EmployeeRoles", [
      { role: "Admin", protected: true, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { role: "Employee", protected: true, isActive: "1", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Remove apenas os que não são protegidos
    await queryInterface.bulkDelete("EmployeeRoles", {
      protected: false
    });
  }
};
