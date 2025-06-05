const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const {
      nic,
      nif,
      birthDate,
      gender,
      name,
      email,
      phone,
      adress,
      createdAt,
      page = 1,
      pageSize = 10,
      orderBy,
      orderDirection,
    } = req.query;

		const where = {};

    if (nic) where.nic = { [Op.like]: `${nic}%` };
    if (nif) where.nif = { [Op.like]: `${nif}%` };
    if (gender) where.gender = { [Op.like]: `${gender}%` };
    if (adress) where.adress = { [Op.like]: `${adress}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (phone) where.phone = { [Op.like]: `%${phone}%` };
    if (name) {
      where[Op.and] = Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        {
          [Op.iLike]: `%${name}%`,
        }
      );
    }

    if (createdAt) {
      where.createdAt = {
        [Op.gte]: new Date(createdAt),
        [Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
      };
    }

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let order = [];
    if (orderBy && orderDirection) {
      order = [[orderBy, orderDirection.toUpperCase()]];
    } else {
      order = [["nic", "ASC"]];
    }

    const { count, rows } = await models.Client.findAndCountAll({
      where,
      limit: parseInt(pageSize),
      offset,
      order,
    });

    const formattedData = rows.map((item) => ({
      nic: item.nic,
      nif: item.nif,
      birthDate: item.birthDate,
      gender: item.gender,
      name: item.firstName + " " + item.lastName,
      email: item.email,
      phone: item.phone,
      adress: item.adress,
      createdAt: item.createdAt,
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Error fetching clients." });
  }
});

router.get("/displayTable", async (req, res) => {
  try {
    const {
      nic,
      nif,
      birthDate,
      gender,
      name,
      email,
      phone,
      active = "1",
      page = 1,
      pageSize = 10,
      sortField = "nic",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (nic) where.nic = { [Op.like]: `${nic}%` };
    if (nif) where.nif = { [Op.like]: `${nif}%` };
    if (gender) where.gender = { [Op.like]: `${gender}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (phone) where.phone = { [Op.like]: `%${phone}%` };
    if (name) {
      where[Op.and] = Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        {
          [Op.iLike]: `%${name}%`,
        }
      );
    }
    if (active) where.isActive = { [Op.eq]: active };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const orderClause = [];

    if (sortField === "name") {
      orderClause.push([
        Sequelize.fn(
          "concat",
          Sequelize.col("firstName"),
          " ",
          Sequelize.col("lastName")
        ),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      // Para outros campos, use o nome da tabela corretamente
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const { count, rows } = await models.Client.findAndCountAll({
      where,
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    const formattedData = rows.map((item) => ({
      nic: item.nic,
      nif: item.nif,
      name: item.firstName + " " + item.lastName,
      email: item.email,
      birthDate: item.birthDate,
      phone: item.phone,
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Error fetching clients." });
  }
});

router.get("/:NIC", async (req, res) => {
  try {
    const client = await models.Client.findByPk(req.params.NIC);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:NIC", async (req, res) => {
  try {
    const client = await models.Client.findByPk(req.params.NIC);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    //Verifica se não existe ninguém com aquele nif ou email
    const whereConditions = [];
    if (req.body.nif) {
      whereConditions.push({ nif: req.body.nif });
    }

    // Verificar se o cliente já existe
    if (whereConditions.length > 0) {
      const existingClient = await models.Client.findOne({
        where: {
          [Op.or]: whereConditions,
          nic: { [Op.ne]: req.params.NIC }, // opcional: evitar conflito com ele mesmo
        },
      });

      if (existingClient) {
        return res.status(409).json({ errorTag: "nif" });
      }
    }

    await client.update(req.body);

    res.cookie("clientInfo", client.dataValues, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:NIC", async (req, res) => {
  try {
    const client = await models.Client.findByPk(req.params.NIC);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    await client.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const {
      nic,
      nif,
      birthDate,
      gender,
      firstName,
      lastName,
      email,
      phone,
      adress,
      isActive = 1,
      latitude,
      longitude,
    } = req.body;

    // Verificar se o cliente já existe
    const searchConditions = [];

    if (nic) searchConditions.push({ nic });
    if (nif) searchConditions.push({ nif });
    if (phone) searchConditions.push({ phone });
    if (email) searchConditions.push({ email });

    const existingClient = await models.Client.findOne({
      where: {
        [Op.or]: searchConditions,
      },
    });

    if (existingClient) {
      let errorTag = "";
      if (existingClient.nic == nic) {
        errorTag = "nic";
      } else if (existingClient.nif == nif) {
        errorTag = "nif";
      } else if (existingClient.phone == phone) {
        errorTag = "phone";
      } else if (existingClient.email == email) {
        errorTag = "email";
      }
      return res.status(200).json({ errorTag: errorTag }); // Retorna imediatamente para evitar múltiplas respostas
    }

    // Criar o cliente caso não exista
    const client = await models.Client.create({
      nic,
      nif,
      birthDate,
      gender,
      firstName,
      lastName,
      email,
      phone,
      adress,
      isActive,
      latitude,
      longitude,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.patch("/activation/:nic", async (req, res) => {
  try {
    const client = await models.Client.findByPk(req.params.nic);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    client.updatedAt = new Date();
    client.isActive = client.isActive === "1" ? "0" : "1";
    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Error updating client." });
  }
});

module.exports = router;
