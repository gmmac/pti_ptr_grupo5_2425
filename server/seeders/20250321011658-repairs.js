'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Repairs", [
      {
      id: 2,
      statusID: 1,
      description: "O computador não mostra nada no ecrã",
      budget: 170.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-28T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "123456789",
      equipmentSheetID: "10000000000000000019",
      createdAt: "2025-06-24T18:28:44.303Z",
      updatedAt: "2025-06-24T18:28:44.303Z"
    },
    {
      id: 5,
      statusID: 1,
      description: "A coluna está sempre a ligar e a desligar",
      budget: 30.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-26T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "123456789",
      equipmentSheetID: "10000000000000000040",
      createdAt: "2025-06-24T18:31:56.660Z",
      updatedAt: "2025-06-24T18:31:56.660Z"
    },
    {
      id: 6,
      statusID: 1,
      description: "A bateria do computador está viciada",
      budget: 200.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-10T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "082745464",
      equipmentSheetID: "10000000000000000020",
      createdAt: "2025-06-24T18:33:32.646Z",
      updatedAt: "2025-06-24T18:33:32.646Z"
    },
    {
      id: 7,
      statusID: 1,
      description: "A impressão digital não funciona",
      budget: 200.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-04T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "157493820",
      equipmentSheetID: "12345678901234567890",
      createdAt: "2025-06-24T18:35:16.444Z",
      updatedAt: "2025-06-24T18:35:16.444Z"
    },
    {
      id: 8,
      statusID: 1,
      description: "A televisão está com muitas luzes brancas a aparecer",
      budget: 400.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-26T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "222444888",
      equipmentSheetID: "10000000000000000115",
      createdAt: "2025-06-24T18:36:07.541Z",
      updatedAt: "2025-06-24T18:36:07.541Z"
    },
    {
      id: 9,
      statusID: 1,
      description: "O monitor está a ficar muito quente",
      budget: 140.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-06T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "281706294",
      equipmentSheetID: "10000000000000000015",
      createdAt: "2025-06-24T18:36:50.578Z",
      updatedAt: "2025-06-24T18:36:50.578Z"
    },
    {
      id: 10,
      statusID: 1,
      description: "A playstation deu um estalo e parou de funcionar",
      budget: 300.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-28T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "593069771",
      equipmentSheetID: "34567890123456789012",
      createdAt: "2025-06-24T18:38:51.241Z",
      updatedAt: "2025-06-24T18:38:51.241Z"
    },
    {
      id: 11,
      statusID: 1,
      description: "A camara faz um barulho",
      budget: 150.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-25T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "278364910",
      equipmentSheetID: "10000000000000000031",
      createdAt: "2025-06-24T18:42:21.678Z",
      updatedAt: "2025-06-24T18:42:21.678Z"
    },
    {
      id: 12,
      statusID: 1,
      description: "O numpad do teclado parou de funcionar",
      budget: 30.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-08-21T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "259373971",
      equipmentSheetID: "10000000000000000036",
      createdAt: "2025-06-24T18:44:44.152Z",
      updatedAt: "2025-06-24T18:44:44.152Z"
    },
    {
      id: 14,
      statusID: 1,
      description: "A base da televisão partiu",
      budget: 250.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-06T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "563578298",
      equipmentSheetID: "10000000000000000098",
      createdAt: "2025-06-24T18:46:39.035Z",
      updatedAt: "2025-06-24T18:46:39.035Z"
    },
    {
      id: 17,
      statusID: 1,
      description: "O meu relógio apanhou com água e agora tem uma bolha no ecrã",
      budget: 40.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-12T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "686189004",
      equipmentSheetID: "10000000000000000034",
      createdAt: "2025-06-24T18:50:29.191Z",
      updatedAt: "2025-06-24T18:50:29.191Z"
    },
    {
      id: 19,
      statusID: 1,
      description: "O meu teclado deixou de conectar ao computador",
      budget: 55.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-18T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "864209173",
      equipmentSheetID: "10000000000000000074",
      createdAt: "2025-06-24T18:53:26.837Z",
      updatedAt: "2025-06-24T18:53:26.837Z"
    },
    {
      id: 20,
      statusID: 1,
      description: "A televisão não sai do ecrã das definições",
      budget: 90.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-04T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "158218186",
      equipmentSheetID: "10000000000000000113",
      createdAt: "2025-06-24T18:54:10.092Z",
      updatedAt: "2025-06-24T18:54:10.092Z"
    },
    {
      id: 1,
      statusID: 5,
      description: "Só consigo ouvir do lado esquerdo dos fones",
      budget: 120.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-27T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "082745464",
      equipmentSheetID: "10000000000000000012",
      createdAt: "2025-06-24T18:22:18.972Z",
      updatedAt: "2025-06-24T19:11:43.430Z"
    },
    {
      id: 4,
      statusID: 3,
      description: "A tecla do espaço não funciona",
      budget: 15.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-01T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "082745464",
      equipmentSheetID: "10000000000000000059",
      createdAt: "2025-06-24T18:31:23.779Z",
      updatedAt: "2025-06-24T19:12:07.830Z"
    },
    {
      id: 3,
      statusID: 3,
      description: "O meu teclado parou de funcionar",
      budget: 50.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-29T00:00:00.000Z",
      employeeId: "364611960",
      clientId: "123456789",
      equipmentSheetID: "10000000000000000048",
      createdAt: "2025-06-24T18:29:20.095Z",
      updatedAt: "2025-06-24T19:12:24.854Z"
    },
    {
      id: 13,
      statusID: 4,
      description: "O meu telemóvel esta a aquecer bastante",
      budget: 200.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-05T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "505202083",
      equipmentSheetID: "10000000000000000033",
      createdAt: "2025-06-24T18:45:15.766Z",
      updatedAt: "2025-06-24T19:12:42.844Z"
    },
    {
      id: 15,
      statusID: 4,
      description: "A televisão não liga",
      budget: 240.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-08-16T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "692048173",
      equipmentSheetID: "10000000000000000108",
      createdAt: "2025-06-24T18:47:18.516Z",
      updatedAt: "2025-06-24T19:12:48.371Z"
    },
    {
      id: 16,
      statusID: 4,
      description: "As luzes da colunas deixaram de funcionar",
      budget: 20.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-07-11T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "536817204",
      equipmentSheetID: "10000000000000000039",
      createdAt: "2025-06-24T18:48:47.338Z",
      updatedAt: "2025-06-24T19:12:55.196Z"
    },
    {
      id: 21,
      statusID: 4,
      description: "Trocar ecrã e bateria",
      budget: 250.0,
      currentCost: 250.0,
      estimatedDeliverDate: "2025-06-29T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "157493820",
      equipmentSheetID: "12345678901234567890",
      createdAt: "2025-06-24T19:09:59.956Z",
      updatedAt: "2025-06-24T19:13:14.074Z"
    },
    {
      id: 18,
      statusID: 2,
      description: "A minha nintendo não lê os cartões dos jogos",
      budget: 250.0,
      currentCost: 0.0,
      estimatedDeliverDate: "2025-06-27T00:00:00.000Z",
      employeeId: "748593201",
      clientId: "715384902",
      equipmentSheetID: "10000000000000000029",
      createdAt: "2025-06-24T18:51:33.458Z",
      updatedAt: "2025-06-24T19:13:43.608Z"
    }
    ]);

    await queryInterface.sequelize.query(`
  SELECT setval(
    pg_get_serial_sequence('"Repairs"', 'id'),
    (SELECT MAX(id) FROM "Repairs")
  )
`);
  },

  async down (queryInterface, Sequelize) {

  }
};
