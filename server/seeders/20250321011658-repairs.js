'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Repairs", [
      { 
        statusID: 1, 
        description: "A playstation está a fazer muito barulho", 
        budget: 150,
        estimatedDeliverDate: new Date(),
        employeeId: 123456789,
        clientId: 123456789,
        usedEquipmentId: 5,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        statusID: 1, 
        description: "O telemóvel deixou de ligar", 
        budget: 150,
        estimatedDeliverDate: new Date(),
        employeeId: 123456789,
        clientId: 123456789,
        usedEquipmentId: 1,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ]);
  },

  async down (queryInterface, Sequelize) {

  }
};
