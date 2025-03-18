'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentTypes', [
      { name: 'Smartphone', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Game Console', createdAt: new Date(), updatedAt: new Date() },
      { name: 'TV', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laptop', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartwatch', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Headphones', createdAt: new Date(), updatedAt: new Date() },
    ]);


    await queryInterface.bulkInsert('EmployeeRoles', [
      {
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 'Employee',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);


    await queryInterface.bulkInsert('EquipmentStatuses', [
      { state: 'Available', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Sold', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Reserved', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Under Maintenance', createdAt: new Date(), updatedAt: new Date() },
      { state: 'Damaged', createdAt: new Date(), updatedAt: new Date() },
    ], {});


  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentTypes', null, {});
    await queryInterface.bulkDelete('EmployeeRoles', null, {});
    await queryInterface.bulkDelete('EquipmentStatuses', null, {});

  }
};
