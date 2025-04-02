'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProjectStatuses', [
      {
        state: 'Opened',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        state: 'Closed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProjectStatuses', null, {});
  }
};
