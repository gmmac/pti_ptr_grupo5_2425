'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('CharityProjectEquipmentTypes', [
      {
        equipmentTypeId: 2,
        charityProjectId: 2,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        equipmentTypeId: 3,
        charityProjectId: 2,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   equipmentTypeId: 6,
      //   charityProjectId: 3,
      //   quantity: 7,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      {
        equipmentTypeId: 1,
        charityProjectId: 1,
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjectEquipmentTypes', null, {});
  }
};