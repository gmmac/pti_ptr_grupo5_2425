/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        nic: '123456789',
        nif: '987654321',
        internNum: '123456',
        storeNIPC: "123456789",
        birthDate: new Date('1990-05-15'), 
        gender: 'M', // 'M' para masculino, 'F' para feminino
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@example.com',
        phone: '912345678',
        address: 'Rua da Alegria, 10', 
        latitude: '38.7239', 
        longitude: '-9.1391', 
        role: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nic: '234567890',
        nif: '876543210',
        storeNIPC: "123456789",
        internNum: '654321',
        birthDate: new Date('1985-09-25'), 
        gender: 'F', // 'F' para feminino
        firstName: 'Maria',
        lastName: 'Pereira',
        email: 'maria.pereira@example.com',
        phone: '923456789',
        address: 'Avenida da Liberdade, 25',
        latitude: '41.1496', 
        longitude: '-8.6110', 
        role: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nic: '345678901',
        nif: '765432109',
        internNum: '987654',
        storeNIPC: "123456789",
        birthDate: new Date('1992-12-10'), 
        gender: 'M', // 'M' para masculino
        firstName: 'Carlos',
        lastName: 'Sousa',
        email: 'carlos.sousa@example.com',
        phone: '934567890',
        address: 'Rua do Comércio, 55',
        latitude: '40.2056', 
        longitude: '-8.4196', 
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nic: '456789012',
        nif: '654321098',
        internNum: '246810',
        storeNIPC: "123456789",
        birthDate: new Date('1988-07-30'), 
        gender: 'F', // 'F' para feminino
        firstName: 'Ana',
        lastName: 'Costa',
        email: 'ana.costa@example.com',
        phone: '945678901',
        address: 'Avenida Central, 100',
        latitude: '37.0194', 
        longitude: '-7.9304', 
        role: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nic: '567890123',
        nif: '543210987',
        internNum: '135791',
        storeNIPC: "123456789",
        birthDate: new Date('1995-02-20'), 
        gender: 'M', // 'M' para masculino
        firstName: 'Pedro',
        lastName: 'Oliveira',
        email: 'pedro.oliveira@example.com',
        phone: '956789012',
        address: 'Rua das Palmeiras, 42',
        latitude: '41.1496', 
        longitude: '-8.6110', 
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Employees', null, {});
  }
};