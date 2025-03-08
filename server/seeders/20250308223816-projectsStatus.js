'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProjectStatuses', [
      {
        state: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        state: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        state: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        state: 'On Hold',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        state: 'Cancelled',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProjectStatuses', null, {});
  }
};
