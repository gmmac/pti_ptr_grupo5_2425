'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UsedEquipments', [
      {statusID: '1', price: 150.75, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789021', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '1', price: 200.50, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789023', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '4', price: 175.30, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789023', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '1', price: 190.99, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789024', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '4', price: 165.40, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789025', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '5', price: 220.80, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789021', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '2', price: 185.90, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789022', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '2', price: 210.45, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789023', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '2', price: 195.60, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789024', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '2', price: 180.35, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789023', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '4', price: 140.20, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789021', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '3', price: 175.80, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789022', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '3', price: 190.25, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789022', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '3', price: 205.95, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789024', createdAt: new Date(), updatedAt: new Date()},
      {statusID: '3', price: 160.75, saleDate: new Date(), purchaseDate: new Date(), equipmentId: '123456789025', createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UsedEquipments', null, {});
  }
};