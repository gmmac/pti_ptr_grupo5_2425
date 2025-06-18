const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const purchases = await models.ClientPurchase.findAll();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/display-table", async (req, res) => {
  try {
    const {
      id,
      clientNIC,
      employeeNIC,
      total,
      state,
      address,
      storeId,
      CreatedAt,
      page = 1,
      pageSize = 10,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("ClientPurchase.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );
    if (clientNIC) where["$Client.nic$"] = { [Op.iLike]: `${clientNIC}%` };
    if (employeeNIC)
      where["$Employee.nic$"] = { [Op.iLike]: `${employeeNIC}%` };
    if (total)
      where.total = sequelize.where(
        sequelize.cast(sequelize.col("total"), "varchar"),
        { [Op.iLike]: `${total}%` }
      );
    if (state) where["$OrderStatus.id$"] = Number(state);
    if (address) where.address = { [Op.iLike]: `%${address}%` };
    if (storeId) where.storeId = { [Op.iLike]: `%${storeId}%` };
    if (CreatedAt) {
      const dateStart = new Date(CreatedAt);
      dateStart.setHours(0, 0, 0, 0);

      const dateEnd = new Date(CreatedAt);
      dateEnd.setHours(23, 59, 59, 999);

      where.createdAt = {
        [Op.between]: [dateStart, dateEnd],
      };
    }

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let orderClause = [];
    if (sortField) {
      // Sequelize precisa de campo válido e direção
      orderClause.push([
        sortField,
        sortOrder === "1" || sortOrder === "ASC" ? "ASC" : "DESC",
      ]);
    } else {
      orderClause.push(["id", "ASC"]);
    }

	console.log("WHERE:", where);
  console.log("ORDER:", orderClause);

    const { count, rows } = await models.ClientPurchase.findAndCountAll({
      where,
      include: [
        {
          model: models.Client,
          attributes: ["nic", "firstName", "lastName"],
        },
        {
          model: models.Employee,
          attributes: ["nic", "firstName", "lastName"],
        },
        {
          model: models.OrderStatus,
          attributes: ["id", "state"],
        },
      ],
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    const formattedData = rows.map((item) => ({
      id: item.id,
      total: item.total,
      state: item.OrderStatus?.state ?? "—",
      employeeNIC: item.Employee?.nic ?? "—",
      employeeName: item.Employee
        ? item.Employee.firstName + " " + item.Employee.lastName
        : null,
      clientNIC: item.Client?.nic ?? "—",
      clientName: item.Client
        ? item.Client.firstName + " " + item.Client.lastName
        : null,
      CreatedAt: item.createdAt,
      UpdatedAt: item.updatedAt,
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching sales", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      clientNIC,
      totalPrice,
      employeeID,
      pickupInStore,
      address,
      storeId,
    } = req.body;

    if (!clientNIC || totalPrice === undefined || totalPrice === null) {
      return res
        .status(400)
        .json({ error: "clientNIC e totalPrice são obrigatórios." });
    }

    const purchase = await models.ClientPurchase.create({
      clientNIC,
      total: totalPrice,
      employeeID: employeeID ?? "123456789", // padrão
      orderStatusID: 1, // padrão - pendding approval
      pickupInStore,
      address: address ?? "",
      storeId: storeId ?? null,
    });

    res.status(201).json({ id: purchase.id });
  } catch (error) {
    console.error("Erro ao criar compra:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/client-orders/:ID", async (req, res) => {
  try {
    const clientId = req.params.ID;

    const cartsIds = await models.ClientPurchase.findAll({
      where: { clientNIC: clientId },
      include: {
        model: models.OrderStatus,
        attributes: ["state"],
      },
    });

    if (!cartsIds) {
      return res.status(404).json({ error: "Carrinhos não encontrados" });
    }

    res.status(200).json(cartsIds);
  } catch (error) {
    console.error("Erro ao buscar PurchaseCartEquipment:", error);
    res.status(500).json({ error: "Erro ao buscar PurchaseCartEquipment." });
  }
});

router.get("/:ID", async (req, res) => {
  try {
    const purchase = await models.ClientPurchase.findByPk(req.params.ID);
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:ID", async (req, res) => {
  try {
    const purchase = await models.ClientPurchase.findByPk(req.params.ID);
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    await purchase.update(req.body);
    res.json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:ID", async (req, res) => {
  try {
    const purchase = await models.ClientPurchase.findByPk(req.params.ID);
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    await purchase.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
