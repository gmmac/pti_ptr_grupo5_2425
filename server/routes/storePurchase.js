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
      page      = 1,
      pageSize  = 4,
      sortField = 'usedEquipmentId',
      sortOrder = 'ASC'
    } = req.query;

    // Build base filter
    const where = {};
    if (charityProjectId) {
      where.charityProjectId = Number(charityProjectId);
    }

    // 1) Count how many distinct equipments match
    const totalItems = await models.CharityProjectDonations.count({
      where,
      distinct: true,
      col: 'usedEquipmentId'
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    const offset     = (Number(page) - 1) * Number(pageSize);

    // 2) Fetch one page of distinct equipment IDs
    const equipmentRows = await models.CharityProjectDonations.findAll({
      where,
      attributes: ['usedEquipmentId'],
      group:      ['usedEquipmentId'],
      order:      [[sortField, sortOrder]],
      limit:      Number(pageSize),
      offset
    });
    const equipIds = equipmentRows.map(r => r.usedEquipmentId);

    // 3) Now fetch *all* donations for those equipments, with nested ordering
    const donations = await models.CharityProjectDonations.findAll({
      where: { usedEquipmentId: equipIds },
      include: [
        {
          model: models.UsedEquipment,
          as: 'UsedEquipment',
          attributes: ['id'],
          include: [
            {
              model: models.EquipmentSheet,
              as: 'EquipmentSheet',
              attributes: ['barcode'],
              include: [{
                model: models.EquipmentModel,
                as: 'EquipmentModel',
                attributes: ['id','name'],
                include: [{
                  model: models.Brand,
                  as: 'Brand',
                  attributes: ['id','name']
                }]
              }]
            },
            {
              model: models.StorePurchase,
              as: 'StorePurchases',
              attributes: ['id','storeID','clientNIC','employeeID','createdAt'],
              include: [
                { model: models.Client,   as: 'Client',   attributes: ['nic','firstName','lastName','email'] },
                { model: models.Employee, as: 'Employee', attributes: ['nic','firstName','lastName','email'] },
                { model: models.Store,    as: 'Store',    attributes: ['nipc','name'] }
              ]
            }
          ]
        },
        {
          model: models.CharityProject,
          as: 'CharityProject',
          attributes: ['id','name'],
          include: [{
            model: models.Warehouse,
            as: 'Warehouse',
            attributes: ['id','name']
          }]
        }
      ],
      order: [
        ['usedEquipmentId', 'ASC'],
        [ 
          { model: models.UsedEquipment,  as: 'UsedEquipment'  },
          { model: models.StorePurchase, as: 'StorePurchases' },
          'createdAt',
          'ASC'
        ]
      ]
    });

    // 4) Group and reshape into the API format
    const grouped = equipIds.map(eid => {
      const slice = donations.filter(d => d.usedEquipmentId === eid);
      const first = slice[0];
      return {
        Project: {
          charityProjectId:   first.CharityProject.id,
          charityProjectName: first.CharityProject.name
        },
        Warehouse: {
          id:   first.CharityProject.Warehouse.id,
          name: first.CharityProject.Warehouse.name
        },
        Equipment: {
          usedEquipmentId: eid,
          barcode:         first.UsedEquipment.EquipmentSheet.barcode,
          brandModel:
            first.UsedEquipment.EquipmentSheet.EquipmentModel.Brand.name + ' ' +
            first.UsedEquipment.EquipmentSheet.EquipmentModel.name
        },
        Purchases: first.UsedEquipment.StorePurchases
      };
    });

    return res.json({
      totalItems,
      totalPages,
      currentPage: Number(page),
      pageSize:     Number(pageSize),
      data:         grouped
    });
  }
  catch(err) {
    console.error("Error in /getDonations:", err);
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
    const donation = await models.CharityProjectDonations.create({
      charityProjectId,
      usedEquipmentId: usedEquipmentID,
      createdAt:       new Date(),
      updatedAt:       new Date()
    });

    // 4) Decrementa slots
    await warehouse.decrement("availableSlots", { by: 1 });

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
