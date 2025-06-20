'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Interests", [
      { 
        equipmentSheetID: "12345678901234567890",
        folderInterestID: 2,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "23456789012345678901",
        folderInterestID: 2,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "45678901234567890123",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "67890123456789012345",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "78901234567890123456",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000013",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000018",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000019",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000020",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000021",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000022",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000023",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000024",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000025",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000026",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000027",
        folderInterestID: 3,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "34567890123456789012",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "56789012345678901234",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "90123456789012345678",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "90123456789012345679",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000017",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000028",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000029",
        folderInterestID: 4,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        equipmentSheetID: "10000000000000000014",
        folderInterestID: 5,
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
