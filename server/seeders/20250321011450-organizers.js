'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizers', [
      {
        nic: "150067348",
        nif: "208702970",
        birthDate: "1981-09-02T00:00:00.000Z",
        gender: "F",
        firstName: "Pilar",
        lastName: "Ferreira",
        email: "pilar.ferreira@gmail.com",
        phone: "215369748",
        createdAt: "2025-06-20T19:07:02.003Z",
        updatedAt: "2025-06-20T19:07:02.003Z"
      },
      {
        nic: "334984742",
        nif: "225407116",
        birthDate: "1996-10-15T00:00:00.000Z",
        gender: "M",
        firstName: "Jorge",
        lastName: "Almeida",
        email: "jorge.almeida@gmail.com",
        phone: "934430351",
        createdAt: "2025-06-20T22:59:37.624Z",
        updatedAt: "2025-06-20T22:59:37.625Z"
      },
      {
        nic: "261638658",
        nif: "940793482",
        birthDate: "2005-06-09T00:00:00.000Z",
        gender: "F",
        firstName: "Mariana",
        lastName: "Silva",
        email: "masilva@gmail.com",
        phone: "939333952",
        createdAt: "2025-06-21T00:34:22.194Z",
        updatedAt: "2025-06-21T00:34:22.194Z"
      },
      {
        nic: "334739131",
        nif: "952330237",
        birthDate: "1999-09-07T00:00:00.000Z",
        gender: "F",
        firstName: "Margarida",
        lastName: "Martina",
        email: "margarida.marina@gmail.com",
        phone: "959694204",
        createdAt: "2025-06-21T00:35:11.404Z",
        updatedAt: "2025-06-21T00:35:11.404Z"
      },
      {
        nic: "612583731",
        nif: "987362364",
        birthDate: "1996-06-05T00:00:00.000Z",
        gender: "M",
        firstName: "Martim",
        lastName: "Alves",
        email: "ma@gmail.com",
        phone: "930393270",
        createdAt: "2025-06-21T00:35:58.869Z",
        updatedAt: "2025-06-21T00:35:58.869Z"
      },
      {
        nic: "125507072",
        nif: "472347225",
        birthDate: "2002-11-12T00:00:00.000Z",
        gender: "M",
        firstName: "Henrique",
        lastName: "Henriques",
        email: "hehes@gmail.com",
        phone: "932446526",
        createdAt: "2025-06-21T00:36:58.315Z",
        updatedAt: "2025-06-21T00:36:58.315Z"
      },
      {
        nic: "362088072",
        nif: "427409756",
        birthDate: "1984-05-16T00:00:00.000Z",
        gender: "M",
        firstName: "Diogo",
        lastName: "Rocha",
        email: "diogo.rocha@yahoo.com",
        phone: "934068229",
        createdAt: "2025-06-21T00:38:31.164Z",
        updatedAt: "2025-06-21T00:38:31.164Z"
      },
      {
        nic: "435732377",
        nif: "647774070",
        birthDate: "2004-05-10T00:00:00.000Z",
        gender: "F",
        firstName: "Carla",
        lastName: "Pereira",
        email: "carla.pereira@hotmail.com",
        phone: "954180548",
        createdAt: "2025-06-21T00:39:14.723Z",
        updatedAt: "2025-06-21T00:39:14.723Z"
      },
      {
        nic: "602410652",
        nif: "692290966",
        birthDate: "2002-10-02T00:00:00.000Z",
        gender: "M",
        firstName: "Bruno",
        lastName: "Pereira",
        email: "bruno.pereira@outlook.com",
        phone: "925535666",
        createdAt: "2025-06-21T00:40:59.596Z",
        updatedAt: "2025-06-21T00:40:59.596Z"
      },
      {
        nic: "086631941",
        nif: "497249162",
        birthDate: "1995-04-10T00:00:00.000Z",
        gender: "F",
        firstName: "Beatriz",
        lastName: "Rodrigues",
        email: "beatriz.rodrigues@gmail.com",
        phone: "951532423",
        createdAt: "2025-06-21T00:41:45.080Z",
        updatedAt: "2025-06-21T00:41:45.080Z"
      },
      {
        nic: "871573694",
        nif: "023418605",
        birthDate: "1981-04-04T00:00:00.000Z",
        gender: "M",
        firstName: "Pedro",
        lastName: "Pereira",
        email: "pedro.pereira@hotmail.com",
        phone: "927648778",
        createdAt: "2025-06-21T00:42:32.033Z",
        updatedAt: "2025-06-21T00:42:32.033Z"
      },
      {
        nic: "808764251",
        nif: "040184250",
        birthDate: "1992-04-03T00:00:00.000Z",
        gender: "F",
        firstName: "Luisa",
        lastName: "Rodrigues",
        email: "luisa.rodrigues@yahoo.com",
        phone: "928086545",
        createdAt: "2025-06-21T00:40:07.288Z",
        updatedAt: "2025-06-21T00:40:07.288Z"
      },
      {
        nic: "051894633",
        nif: "965655032",
        birthDate: "1989-12-08T00:00:00.000Z",
        gender: "F",
        firstName: "Joana",
        lastName: "Gomes",
        email: "joana.gomes@gmail.com",
        phone: "938791630",
        createdAt: "2025-06-21T00:43:46.267Z",
        updatedAt: "2025-06-21T00:43:46.267Z"
      },
      {
        nic: "373436999",
        nif: "859978648",
        birthDate: "1982-02-20T00:00:00.000Z",
        gender: "F",
        firstName: "Josefa",
        lastName: "Oliveira",
        email: "josefa.oliveira@yahoo.com",
        phone: "938194543",
        createdAt: "2025-06-21T00:45:20.533Z",
        updatedAt: "2025-06-21T00:45:20.533Z"
      },
      {
        nic: "005144650",
        nif: "135295602",
        birthDate: "1973-10-27T00:00:00.000Z",
        gender: "F",
        firstName: "Cláudia",
        lastName: "Gomes",
        email: "claudia.gomes@outlook.com",
        phone: "916011217",
        createdAt: "2025-06-21T00:46:06.321Z",
        updatedAt: "2025-06-21T00:46:06.321Z"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizers', null, {});
  }
};
