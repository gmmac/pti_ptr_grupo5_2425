'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('EquipmentSheetCharityProjects', [
      {
        equipmentSheetId: '12345678901234567890',
        charityProjectId: 1,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentSheetId: '34567890123456789012',
        charityProjectId: 1,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentSheetId: '45678901234567890123',
        charityProjectId: 2,
        quantity: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   equipmentSheetId: '45678901234567890123',
      //   charityProjectId: 2,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   equipmentSheetId: '56789012345678901234',
      //   charityProjectId: 3,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   equipmentSheetId: '67890123456789012345',
      //   charityProjectId: 3,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   equipmentSheetId: '78901234567890123456',
      //   charityProjectId: 4,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   equipmentSheetId: '89012345678901234567',
      //   charityProjectId: 4,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentSheetCharityProjects', null, {});
  }
};
