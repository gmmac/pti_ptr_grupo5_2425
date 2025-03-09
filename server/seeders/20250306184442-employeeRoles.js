/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EmployeeRoles', [
      {
        role: 'Manager', // Cargo de gerente
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 'Sales Associate', // Cargo de vendedor
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 'Cashier', // Cargo de caixa
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 'Stock Keeper', // Cargo de responsável pelo stock
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 'Security', // Cargo de segurança
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmployeeRoles', null, {});
  }
};
