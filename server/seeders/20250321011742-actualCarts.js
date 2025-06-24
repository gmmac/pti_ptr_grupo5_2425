"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
          "ActualCarts",
          [
            {
              clientNIC: "123456789",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "222444888",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "895235746",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "505202083",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "686189004",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "230980157",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "281706294",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "082745464",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              clientNIC: "158218186",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("ActualCarts", null, {});
    },
};