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
      filterType,
      employee,
      page = 1,
      pageSize = 10,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (filterType === "byMe") {
      where["$Employee.nic$"] = { [Op.iLike]: `${employee.nic}` };
    }

    if (filterType === "myStore") {
      where.storeId = { [Op.iLike]: `${employee.storeNIPC}` };
    }

    if (filterType === "pending") {
      where["$OrderStatus.state$"] = "Pending Approval";
    }

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

    console.log(sortField);
    if (sortField === "state") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("OrderStatus.state")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "employeeNIC") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("Employee.nic")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "CreatedAt") {
      orderClause.push([
        Sequelize.col("createdAt"),
        sortOrder === "1" || sortOrder === "ASC" ? "ASC" : "DESC",
      ]);
    } else if (sortField) {
      if (sortOrder == -1) {
        orderClause.push([Sequelize.col(sortField), "DESC"]);
      } else {
        orderClause.push([Sequelize.col(sortField), "ASC"]);
      }
    } else {
      // Se não veio sortField, garantimos default
      orderClause.push([Sequelize.col("id"), "ASC"]);
    }

    console.log("Final sortField:", sortField);
    console.log("Final sortOrder:", sortOrder);
    console.log("Final orderClause:", orderClause);

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
      state: item.OrderStatus?.state ?? "—",
      employeeNIC: item.Employee?.nic ?? "—",
      employeeName: item.Employee
        ? item.Employee.firstName + " " + item.Employee.lastName
        : null,
      clientNIC: item.Client?.nic ?? "—",
      clientName: item.Client
        ? item.Client.firstName + " " + item.Client.lastName
        : null,
      total: item.total,
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

router.get("/details/:id", async (req, res) => {
  try {
    const saleId = req.params.id;

    const sale = await models.ClientPurchase.findOne({
      where: { id: saleId },
      include: [
        { model: models.Client, attributes: ["nic", "firstName", "lastName"] },
        {
          model: models.Employee,
          attributes: ["nic", "firstName", "lastName"],
        },
        { model: models.OrderStatus, attributes: ["id", "state"] },
      ],
    });

    if (!sale) {
      return res.status(404).json({ error: "Sale not found." });
    }

    const store = await models.Store.findByPk(sale.storeId);

    const equipments = await models.PurchaseCartEquipment.findAll({
      where: { clientPurchaseId: saleId },
      include: {
        model: models.UsedEquipment,
        attributes: ["id", "price"],
        include: [
          {
            model: models.EquipmentSheet,
            include: [
              {
                model: models.EquipmentModel,
                attributes: ["name"],
                include: [{ model: models.Brand }],
              },
            ],
          },
          {
            model: models.EquipmentStatus,
            as: "EquipmentStatus",
            attributes: ["state"],
          },
        ],
      },
    });

    res.json({
      sale: {
        id: sale.id,
        total: sale.total,
        state: sale.OrderStatus?.state ?? "—",
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt,
        address: sale.address,
        store: store,
        client: sale.Client
          ? {
              nic: sale.Client.nic,
              name: `${sale.Client.firstName} ${sale.Client.lastName}`,
            }
          : null,
        employee: sale.Employee
          ? {
              nic: sale.Employee.nic,
              name: `${sale.Employee.firstName} ${sale.Employee.lastName}`,
            }
          : null,
      },
      equipments: equipments.map((eq) => ({
        id: eq.UsedEquipment?.id,
        name: eq.UsedEquipment?.EquipmentSheet.EquipmentModel.name,
        brand: eq.UsedEquipment?.EquipmentSheet.EquipmentModel.Brand.name,
        status: eq.UsedEquipment?.EquipmentStatus.state,
        price: eq.UsedEquipment?.price,
      })),
    });
  } catch (error) {
    console.error("Error fetching sale details:", error);
    res.status(500).json({ error: "Error fetching sale details." });
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

router.patch("/:ID/change-status", async (req, res) => {
  const saleId = req.params.ID;
  const { statusId } = req.body;

  if (!statusId) {
    return res.status(400).json({ error: "Status ID is required." });
  }

  try {
    const sale = await models.ClientPurchase.findByPk(saleId);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found." });
    }

    // Atualiza o status
    sale.orderStatusID = statusId;
    await sale.save();

    res.status(200).json({
      message: "Sale status updated successfully.",
      sale: {
        id: sale.id,
        orderStatusID: sale.orderStatusID,
      },
    });
  } catch (error) {
    console.error("Error updating sale status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the status." });
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
