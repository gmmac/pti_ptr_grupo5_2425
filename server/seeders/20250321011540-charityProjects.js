'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CharityProjects', [
{ id: 1, name: "Projeto Gaming Comunitário", startDate: "2023-05-10T23:00:00.000Z", completionDate: "2026-09-17T23:00:00.000Z", organizerNic: "122454888", status: 2, warehouseID: 4, isActive: "1", createdAt: "2025-06-24T19:45:29.178Z", updatedAt: "2025-06-24T19:46:48.548Z" },
{ id: 2, name: "Caridade 100%", startDate: "2025-06-09T23:00:00.000Z", completionDate: "2025-07-09T23:00:00.000Z", organizerNic: "111479985", status: 2, warehouseID: 1, isActive: "1", createdAt: "2025-06-24T23:43:58.021Z", updatedAt: "2025-06-24T23:49:19.394Z" },
{ id: 3, name: "Projeto Mobile End", startDate: "2024-08-06T23:00:00.000Z", completionDate: "2024-11-06T00:00:00.000Z", organizerNic: "111479985", status: 3, warehouseID: 1, isActive: "1", createdAt: "2025-06-25T02:57:46.847Z", updatedAt: "2025-06-25T03:04:04.535Z" },
{ id: 4, name: "Projeto Sete Sóis", startDate: "2022-05-19T23:00:00.000Z", completionDate: "2022-06-19T23:00:00.000Z", organizerNic: "511124359", status: 3, warehouseID: 3, isActive: "1", createdAt: "2025-06-25T03:35:04.230Z", updatedAt: "2025-06-25T04:28:20.051Z" },
{ id: 5, name: "Projeto Estrela do Amanhã", startDate: "2025-06-24T23:00:00.000Z", completionDate: "2025-06-29T23:00:00.000Z", organizerNic: "511124359", status: 2, warehouseID: 12, isActive: "1", createdAt: "2025-06-25T04:29:10.023Z", updatedAt: "2025-06-25T04:29:19.704Z" },
{ id: 6, name: "Margens do Tejo", startDate: "2025-05-05T23:00:00.000Z", completionDate: "2025-05-12T23:00:00.000Z", organizerNic: "511124359", status: 1, warehouseID: 4, isActive: "1", createdAt: "2025-06-25T04:30:55.088Z", updatedAt: "2025-06-25T04:30:55.088Z" },
{ id: 7, name: "Projeto Marreco Voador", startDate: "2025-06-16T23:00:00.000Z", completionDate: "2025-06-25T23:00:00.000Z", organizerNic: "111222333", status: 1, warehouseID: 15, isActive: "1", createdAt: "2025-06-25T04:32:13.704Z", updatedAt: "2025-06-25T04:32:13.704Z" },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CharityProjects', null, {});
  }
};
