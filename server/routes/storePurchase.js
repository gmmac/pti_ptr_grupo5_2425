const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const {
      employeeName,
      clientName,
      modelName,
      storeName,
      id,
      createdAt,
      purchasePrice,
      usedEquipmentID,
      nic,
      onlyMyPurchases = "false",
      storePurchasesOnly = "false",
      allPrice,
      page = 1,
      pageSize = 5,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    // --- WHERE principal ---
    const where = {};
    if (onlyMyPurchases === "true" && req.cookies.employeeInfo?.nic) {
      where.employeeID = req.cookies.employeeInfo.nic;
    }
    if (storePurchasesOnly === "true" && req.cookies.employeeInfo?.storeNIPC) {
      where.storeID = req.cookies.employeeInfo.storeNIPC;
    }
    if (id) {
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("StorePurchase.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );
    }
    if (createdAt) {
      const start = new Date(createdAt);
      where.createdAt = {
        [Op.gte]: start,
        [Op.lt]: new Date(start.getTime() + 86400000),
      };
    }
    if (purchasePrice) {
      where.purchasePrice = { [Op.eq]: parseFloat(purchasePrice) };
    } else if (!allPrice) {
      where.purchasePrice = { [Op.gt]: 0 };
    }
    if (usedEquipmentID) {
      where.usedEquipmentID = { [Op.eq]: parseInt(usedEquipmentID, 10) };
    }

    // --- Construção de orderClause ---
    const orderDir = ["-1","DESC"].includes(sortOrder.toString().toUpperCase()) ? "DESC" : "ASC";
    const orderClause = [];
    switch (sortField) {
      case "storeName":
        orderClause.push([{ model: models.Store }, "name", orderDir]);
        break;
      case "employeeName":
        orderClause.push([{ model: models.Employee }, "firstName", orderDir]);
        break;
      case "clientName":
        orderClause.push([{ model: models.Client }, "firstName", orderDir]);
        break;
      case "modelName":
        orderClause.push([
          models.UsedEquipment,
          models.EquipmentSheet,
          models.EquipmentModel,
          "name",
          orderDir
        ]);
        break;
      default:
        orderClause.push([sequelize.col(sortField), orderDir]);
    }

    // --- includes com filtros inline ---
    const include = [
      {
        model: models.Employee,
        attributes: ["firstName","lastName"],
        required: true,
        where: employeeName
          ? sequelize.where(
              sequelize.fn("concat",
                sequelize.col("Employee.firstName"),
                " ",
                sequelize.col("Employee.lastName")
              ),
              { [Op.iLike]: `%${employeeName}%` }
            )
          : undefined
      },
      {
        model: models.Client,
        attributes: ["firstName","lastName","nic"],
        // required: Boolean(clientName || nic),
        where: {
          ...(clientName && {
            [Op.and]: sequelize.where(
              sequelize.fn("concat",
                sequelize.col("Client.firstName"),
                " ",
                sequelize.col("Client.lastName")
              ),
              { [Op.iLike]: `%${clientName}%` }
            )
          }),
          ...(nic && { nic })
        }
      },
      {
        model: models.UsedEquipment,
        required: true,
        include: [{
          model: models.EquipmentSheet,
          required: true,
          include: [{
            model: models.EquipmentModel,
            attributes: ["name"],
            required: Boolean(modelName),
            where: modelName
              ? { name: { [Op.iLike]: `%${modelName}%` } }
              : undefined
          }]
        }]
      },
      {
        model: models.Store,
        attributes: ["name"],
        required: Boolean(storeName),
        where: storeName
          ? { name: { [Op.iLike]: `%${storeName}%` } }
          : undefined
      }
    ];

    // --- execução da query ---
    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const { count, rows } = await models.StorePurchase.findAndCountAll({
      where,
      include,
      order: orderClause,
      limit: parseInt(pageSize),
      offset
    });

    // --- formatação sem filter(...) extra ---
    const data = rows.map(item => ({
      id: item.id,
      storeName: item.Store?.name,
      purchasePrice: item.purchasePrice,
      usedEquipmentID: item.usedEquipmentID,
      employeeName: `${item.Employee?.firstName||""} ${item.Employee?.lastName||""}`.trim(),
      clientName: `${item.Client?.firstName||""} ${item.Client?.lastName||""}`.trim(),
      clientNIC: item.Client?.nic,
      modelName: item.UsedEquipment?.EquipmentSheet?.EquipmentModel?.name,
      createdAt: item.createdAt
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count/parseInt(pageSize)),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data
    });
  }
  catch(err) {
    console.error("Error fetching purchases:", err);
    res.status(500).json({ error: "Error fetching purchases." });
  }
});


router.post("/", async (req, res) => {

    try {
        const {statusID, price, clientNic, equipmentBarcode} = req.body;

        const storeID = req.cookies["employeeInfo"].storeNIPC
        const employeeID = req.cookies["employeeInfo"].nic

        const usedEquipment = await models.UsedEquipment.create({ statusID: statusID, equipmentId: equipmentBarcode, storeId: storeID, createdAt: new Date(), updatedAt: new Date() });
        
        // só cria a compra da loja, caso o equipamento usado exista (tenha sido criado)
        if(usedEquipment){
            const storePurchases = await models.StorePurchase.create({ storeID: storeID, clientNIC: clientNic, employeeID: employeeID, purchasePrice: price, usedEquipmentID: usedEquipment.id, createdAt: new Date(), updatedAt: new Date() });
            res.status(201).json(storePurchases);
        } else{
            res.status(400).json({ error: "Error creating equipment." });
        }

    } catch (error) {
        res.status(400).json({ error: "Error creating storePurchase." });
    }
});


router.get("/getDonations", async (req, res) => {
  try {
    const {
      charityProjectId,
      page           = 1,
      pageSize       = 4,
      orderBy        = "usedEquipmentId",
      orderDirection = "ASC"
    } = req.query;

    const offset = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);
    const limit  = parseInt(pageSize, 10);

    // filtro opcional por projeto
    const where = {};
    if (charityProjectId) {
      where.charityProjectId = { [Op.eq]: Number(charityProjectId) };
    }

    const { count, rows } = await models.CharityProjectDonations.findAndCountAll({
      where,
      include: [
        {
          model: models.UsedEquipment,
          attributes: ['id'],
          include: [
            {
              model: models.EquipmentSheet,
              attributes: ['barcode'],
              include: [
                {
                  model: models.EquipmentModel,
                  attributes: ['id','name'],

                  include: [{
                    model: models.Brand,
                    attributes: ['id','name']
                  }]
                },
                {
                  model: models.EquipmentType,
                  attributes: ['id','name'],
                }
              ]
            },
            {
              model: models.StorePurchase,
              attributes: ['id','createdAt'],
              include: [
                { model: models.Client,   attributes: ['nic','firstName','lastName','email'] },
                { model: models.Employee, attributes: ['nic','firstName','lastName','email'] },
                { model: models.Store,    attributes: ['nipc','name'] }
              ]
            },
            {
              model: models.CharityProject,
                include: [
                { model: models.Warehouse },
              ]
            }
          ]
        }
      ],
      order: [[orderBy, orderDirection.toUpperCase()]],
      offset,
      limit
    });

    const formattedAll = rows.flatMap(item => {
      const ue = item.UsedEquipment;
      const project = ue.CharityProjects[0];
      const warehouse = project.Warehouse;

      return ue.StorePurchases.map(purchase => ({
        Project: { id: project.id, name: project.name },
        Warehouse: { id: warehouse.id, name: warehouse.name },
        Equipment: {
          usedEquipmentId: ue.id,
          barcode: ue.EquipmentSheet.barcode,
          brandModel: `${ue.EquipmentSheet.EquipmentModel.Brand.name} ${ue.EquipmentSheet.EquipmentModel.name}`,
          type: ue.EquipmentSheet.EquipmentType.name
        },
        Purchase: {
          id: purchase.id,
          purchase_date: purchase.createdAt,
          Client: {
            nic: purchase.Client.nic,
            name: `${purchase.Client.firstName} ${purchase.Client.lastName}`,
          },
          Employee: {
            nic: purchase.Employee.nic,
            name: `${purchase.Employee.firstName} ${purchase.Employee.lastName}`,
          },
          Store: {
            nipc: purchase.Store.nipc,
            name: purchase.Store.name,
          },
        },
      }));
    });


    res.json({
      totalItems:  count,
      totalPages:  Math.ceil(count / pageSize),
      currentPage: parseInt(page, 10),
      pageSize:    parseInt(pageSize, 10),
      data:        formattedAll
    });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({ error: 'Error fetching donations.' });
  }
});


router.post("/donate", async (req, res) => {
  try {
    const { clientNic, usedEquipmentID, charityProjectId } = req.body;
    const storeID    = req.cookies["employeeInfo"].storeNIPC;
    const employeeID = req.cookies["employeeInfo"].nic;

    // 1) Projeto e warehouse
    const project   = await models.CharityProject.findByPk(charityProjectId);
    if (!project) {
      return res.status(404).json({ error: "Charity project not found." });
    }
    // Só permite doação se o status for 'Opened' (seed: id = 2)
    if (project.status !== 2) {
      return res
        .status(400)
        .json({ error: "Donations are only allowed for projects in 'Opened' status." });
    }

    const warehouse = await models.Warehouse.findByPk(project.warehouseID);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }
    if (warehouse.availableSlots <= 0) {
      return res.status(400).json({ error: "This warehouse has no available slots." });
    }

    // 2) Cria StorePurchase
    let storePurchase = await models.StorePurchase.findOne({
      where: {
        storeID,
        clientNIC: clientNic,
        employeeID,
        purchasePrice: 0,
        usedEquipmentID,
      }
    });

    if (!storePurchase) {
      storePurchase = await models.StorePurchase.create({
        storeID,
        clientNIC: clientNic,
        employeeID,
        purchasePrice: 0,
        usedEquipmentID,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // 3) Cria linha de doação
    let donation = null;
    if (storePurchase) {
      donation = await models.CharityProjectDonations.create({
        charityProjectId,
        usedEquipmentId: usedEquipmentID,
        createdAt:       new Date(),
        updatedAt:       new Date()
      });
    }

    // 4) Decrementa slots
    await warehouse.decrement("availableSlots", { by: 1 });

    // 5) Marca o equipamento como doado (action = 'D')
    await models.UsedEquipment.update(
      { action: 'D', updatedAt: new Date() },
      { where: { id: usedEquipmentID } }
    );

    return res.status(201).json(donation);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ error: "This equipment has already been donated to this project." });
    }
    console.error("Error in /donate:", error);
    return res.status(500).json({ error: "Unexpected error." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a compra
    const purchase = await models.StorePurchase.findByPk(id);

    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found." });
    }

    // Busca os dados do equipamento usado vinculado à compra
    const usedEquipment = await models.UsedEquipment.findByPk(purchase.usedEquipmentID, {
      attributes: ["statusID", "equipmentId"]
    });

    // Monta a resposta com dados extras do equipamento
    const response = {
      ...purchase.toJSON(),
      statusID: usedEquipment?.statusID || null,
      equipmentID: usedEquipment?.equipmentId || null
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in GET /:id", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { statusID, price, clientNic, equipmentBarcode } = req.body;

    // 1. Verifica se a compra existe
    const purchase = await models.StorePurchase.findByPk(id);
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found." });
    }

    // 2. Atualiza a compra
    await purchase.update({
      clientNIC: clientNic,
      purchasePrice: price,
      updatedAt: new Date()
    });

    // 3. Atualiza o equipamento usado
    const usedEquipment = await models.UsedEquipment.findByPk(purchase.usedEquipmentID);
    if (usedEquipment) {
      await usedEquipment.update({
        statusID: statusID,
        equipmentId: equipmentBarcode,
        updatedAt: new Date()
      });
    }

    return res.status(200).json({ message: "Purchase updated successfully." });
  } catch (error) {
    console.error("Error in PUT /:id", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});


module.exports = router;
