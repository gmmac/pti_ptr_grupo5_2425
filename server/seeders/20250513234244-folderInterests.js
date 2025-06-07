'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("FolderInterests", [
      { 
        name: "Geral",
        clientNIC: 123456789,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: "Telemóveis",
        clientNIC: 123456789,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: "Computadores",
        clientNIC: 123456789,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: "Consolas",
        clientNIC: 123456789,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: "Relógios",
        clientNIC: 123456789,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
