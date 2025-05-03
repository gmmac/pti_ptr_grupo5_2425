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

      if (purchasePrice) {where.purchasePrice = purchasePrice;}      

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


module.exports = router;
