const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");


router.get("/displayTable", async (req, res) => {
  try {
    const {
      id,
      employeeName,
      clientName,
      state,
      modelName,
      createdAt,
      page = 1,
      pageSize = 10,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const where = {};
    const whereRepairStatus = {};
    const whereModel = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("Repair.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );

    if (createdAt) {
      where.createdAt = {
        [Op.gte]: new Date(createdAt),
        [Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
      };
    }

    if (state) whereRepairStatus.state = { [Op.iLike]: `%${state}%` };
    if (modelName) whereModel.name = { [Op.iLike]: `%${modelName}%` };

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

    const { count, rows } = await models.Repair.findAndCountAll({
      where,
      include: [
        {
          model: models.RepairStatus,
          attributes: ["id", "state"],
          where: whereRepairStatus,
        },
        {
          model: models.Employee,
          attributes: ["firstName", "lastName"],
        },
        {
          model: models.Client,
          attributes: ["firstName", "lastName"],
        },
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
      ],
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    const formattedData = rows
      .filter(item => item.EquipmentSheet?.EquipmentModel)
      .map((item) => ({
        id: item.id,
        employeeName: item.Employee?.firstName + " " + item.Employee?.lastName,
        clientName: item.Client?.firstName + " " + item.Client?.lastName,
        state: item.RepairStatus?.state,
        modelName: item.EquipmentSheet.EquipmentModel.name,
        equipmentSheetID: item.equipmentSheetID,
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
    console.error("Erro no endpoint /displayTable:", error);
    res.status(500).json({ error: "Error fetching repairs." });
  }
});


router.get("/displayTable/:clientNIC", async (req, res) => {
  try {
    const {
      id,
      employeeName,
      state,
      modelName,
      createdAt,
      page = 1,
      pageSize = 10,
      sortField = "id",
      sortOrder = "ASC",
      activeRepairs,
    } = req.query;
    const { clientNIC } = req.params;

    const where = {
      clientId: clientNIC,
    };

    if(activeRepairs === "true"){
      where.statusID = { [Op.ne]: 5 }
    }else{
      where.statusID = { [Op.eq]: 5 }
    }

    const whereRepairStatus = {};
    const whereModel = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("Repair.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );
    if (createdAt) {
      where.createdAt = {
        [Op.gte]: new Date(createdAt),
        [Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
      };
    }
    if (state) whereRepairStatus.state = { [Op.iLike]: `%${state}%` };
    if (modelName) whereModel.name = { [Op.iLike]: `%${modelName}%` };
    if (employeeName) {
      where[Op.and] = Sequelize.where(
        Sequelize.fn(
          'concat',
          Sequelize.col('firstName'),
          ' ',
          Sequelize.col('lastName')
        ),
        {
          [Op.iLike]: `%${employeeName}%`
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

    const { count, rows } = await models.Repair.findAndCountAll({
      where,
      include: [
        {
          model: models.RepairStatus,
          attributes: ["id", "state"],
          where: whereRepairStatus,
        },
        {
          model: models.Employee,
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
        }
      ],
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    const formattedData = rows
      .filter(item => item.UsedEquipment?.EquipmentSheet?.EquipmentModel)
      .map((item) => ({
        id: item.id,
        employeeName: item.Employee?.firstName + " " + item.Employee?.lastName,
        state: item.RepairStatus?.state,
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
    res.status(500).json({ error: "Error fetching repairs." });
  }
});


router.post("/", async (req, res) => {
	try {
		const {
			description,
			clientId,
			statusID,
			usedEquipmentId,
			budget,
			estimatedDeliverDate,
		} = req.body;
		
		const employeeId = req.cookies.employeeInfo.nic;

		const repair = await models.Repair.create({
			statusID,
			description,
			budget,
      currentCost: 0,
			estimatedDeliverDate,
			employeeId,
			clientId,
			usedEquipmentId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await models.RepairStatusLog.create({
			statusId: 1,
			description: 'Pedido de reparação criado',
			repairId: repair.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		res.status(200).json({
			data: repair,
		});
	} catch (error) {
	res.status(500).json({ error: "Error creating repair." });
	}
});

router.get("/:id", async (req, res) => {
  try {
    const repair = await models.Repair.findByPk(req.params.id, {
      include: [
        {
          model: models.RepairStatus,
          attributes: ["id", "state"],
        },
        {
          model: models.Employee,
          attributes: ["firstName", "lastName"],
          include: [
            {
              model: models.Store,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!repair) {
      return res.status(404).json({ error: "Repair not found." });
    }

    res.status(200).json(repair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching repair." });
  }
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const {
			description,
			clientId,
			statusID,
			usedEquipmentId,
			budget,
			estimatedDeliverDate,
		} = req.body;

		// Verifica se a repair existe
		const repair = await models.Repair.findByPk(id);
		if (!repair) {
			return res.status(404).json({ error: "Repair not found." });
		}

		// Atualiza os campos
		await repair.update({
			description,
			clientId,
			statusID: statusID ?? repair.statusID, // caso venha undefined
			usedEquipmentId,
			budget,
			estimatedDeliverDate,
			updatedAt: new Date(),
		});

		res.status(200).json({
			message: "Repair updated successfully.",
			data: repair,
		});
	} catch (error) {
		console.error("PUT /repair/:id error:", error);
		res.status(500).json({ error: "Error updating repair." });
	}
});


router.delete("/:id", async (req, res) => {});

module.exports = router;
