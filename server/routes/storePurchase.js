const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/", async (req, res) => {
    try {
      const {
        id,
        clientName,
        employeeName,
        purchasePrice,
        modelName,
        storeName,
        createdAt,
        page = 1,
        pageSize = 10,
        sortField = "id",
        sortOrder = "ASC",
      } = req.query;
      const where = {};
      const whereModel = {};
      const whereStore = {};

      if (id)
        where.id = sequelize.where(
          sequelize.cast(sequelize.col("StorePurchase.id"), "varchar"),
          { [Op.iLike]: `${id}%` }
        );
      if (createdAt) {
        where.createdAt = {
          [Op.gte]: new Date(createdAt),
          [Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
        };
      }

      if (modelName) whereModel.name = { [Op.iLike]: `%${modelName}%` };

      if (storeName) whereStore.name = { [Op.iLike]: `%${storeName}%` };

      if (purchasePrice && parseFloat(purchasePrice) > 0) {
        where.purchasePrice = { [Op.eq]: parseFloat(purchasePrice) };
      } else {
        // Força exibir apenas vendas (maiores que 0)
        where.purchasePrice = { [Op.gt]: 0 };
      }
        

      if (employeeName) {
        where[Op.and] = Sequelize.where(
          Sequelize.fn(
            'concat',
            Sequelize.col('Employee.firstName'),
            ' ',
            Sequelize.col('Employee.lastName')
          ),
          {
            [Op.iLike]: `%${employeeName}%`
          }
        );
      }
      if (clientName) {
        where[Op.and] = Sequelize.where(
          Sequelize.fn(
            'concat',
            Sequelize.col('Client.firstName'),
            ' ',
            Sequelize.col('Client.lastName')
          ),
          {
            [Op.iLike]: `%${clientName}%`
          }
        );
      }
      
      const offset = (parseInt(page) - 1) * parseInt(pageSize);
      const orderClause = [];
      if (sortField) {
        orderClause.push([
          Sequelize.col(sortField),
          sortOrder == -1 ? "DESC" : "ASC",
        ]);
      }
  
      const { count, rows } = await models.StorePurchase.findAndCountAll({
        where,
        include: [
          {
            model: models.Employee,
            attributes: ["firstName", "lastName"],
          },
          {
            model: models.Client,
            attributes: ["firstName", "lastName"],
          },
          {
            model: models.UsedEquipment,
            include: [
              {
                model: models.EquipmentSheet,
                include: [
                  {
                    model: models.EquipmentModel,
                    attributes: ["name"],
                    where: whereModel
                  }
                ]
              }
            ]
          },
          {
            model: models.Store,
            attributes: ["name"],
            where: whereStore
          },
        ],
        limit: parseInt(pageSize),
        offset,
        order: orderClause,
      });
  
      const formattedData = rows
      .filter(item => item.UsedEquipment?.EquipmentSheet?.EquipmentModel)
      .map((item) => ({
        id: item.id,
        storeName: item.Store?.name,
        purchasePrice: item.purchasePrice,
        usedEquipmentID: item.usedEquipmentID,
        employeeName: item.Employee?.firstName + " " + item.Employee?.lastName,
        clientName: item.Client?.firstName + " " + item.Client?.lastName,
        modelName: item.UsedEquipment.EquipmentSheet.EquipmentModel.name,
        createdAt: item.createdAt,
      }));

      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        data: formattedData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching brands." });
    }
});

router.post("/", async (req, res) => {

    try {
        const {statusID, price, clientNic, equipmentBarcode} = req.body;

        const storeID = req.cookies["employeeInfo"].storeNIPC
        const employeeID = req.cookies["employeeInfo"].nic


        const usedEquipment = await models.UsedEquipment.create({ statusID: statusID, price: price, purchaseDate: new Date(), equipmentId: equipmentBarcode, storeId: storeID, createdAt: new Date(), updatedAt: new Date() });
        
        // só cria a compra da loja, caso o equipamento usado exista (tenha sido criado)
        if(usedEquipment){
            const storePurchases = await models.StorePurchase.create({ storeID: storeID, clientNIC: clientNic, employeeID: employeeID, purchasePrice: price, usedEquipmentID: usedEquipment.id, createdAt: new Date(), updatedAt: new Date() });
            res.status(201).json(storePurchases);
        } else{
            res.status(400).json({ error: "Error." });
        }

    } catch (error) {
        res.status(400).json({ error: "Error." });
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
    return res.status(500).json({ error: 'Erro ao buscar equipamentos doados.' });
  }
});



router.post("/donate", async (req, res) => {
  try {
    const { clientNic, usedEquipmentID, charityProjectId } = req.body;
    const storeID    = req.cookies["employeeInfo"].storeNIPC;
    const employeeID = req.cookies["employeeInfo"].nic;

    // 1) Projeto e warehouse
    const project   = await models.CharityProject.findByPk(charityProjectId);
    const warehouse = await models.Warehouse.findByPk(project.warehouseID);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }
    if (warehouse.availableSlots <= 0) {
      return res.status(400).json({ error: "This warehouse has no available slots." });
    }

    // 2) Cria StorePurchase
    const storePurchase = await models.StorePurchase.create({
      storeID,
      clientNIC:     clientNic,
      employeeID,
      purchasePrice: 0,
      usedEquipmentID,
      createdAt:     new Date(),
      updatedAt:     new Date()
    });

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
    // Se for violação de única combinação charityProjectId+usedEquipmentId
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ error: "This equipment has already been donated to this project." });
    }

    console.error("Error in /donate:", error);
    return res.status(500).json({ error: "Unexpected error." });
  }
});




module.exports = router;
