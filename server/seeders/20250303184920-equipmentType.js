'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentTypes', [
      { name: 'Smartphone', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Game Console', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'TV', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laptop', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartwatch', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Headphones', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      
      { name: 'Tablet', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Camera', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Printer', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monitor', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Speaker', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Projector', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Keyboard', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mouse', isActive: "1", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentTypes', null, {});
  }
};
