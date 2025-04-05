const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 10, orderBy, orderDirection} = req.query;
    const activeRepairs = req.query.activeRepairs === "true";

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let order = [];
    const where = {};

    if (orderBy && orderDirection) {
      order = [[orderBy, orderDirection.toUpperCase()]];
    } else {
      order = [["id", "ASC"]];
    }
    if(activeRepairs){
      where.statusID = { [Op.ne]: "5" };
      where.clientId = req.cookies.clientInfo.nic;
    } else {
      where.statusID = "5";
      where.clientId = req.cookies.clientInfo.nic;
    }

    const { count, rows } = await models.Repair.findAndCountAll({
      where,
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
            }
          ]
        }
      ],
      limit: parseInt(pageSize),
      offset,
      order,
    });
    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching repairs." });
  }
});
//falta a paginação

router.post("/", async (req, res) => {
  try {
    const {
      statusID,
      description,
      budget,
      estimatedDeliverDate,
      employeeId,
      usedEquipmentId,
    } = req.body;
    const repair = await models.Repair.create({
      statusID,
      description,
      budget,
      estimatedDeliverDate,
      employeeId,
      usedEquipmentId,
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
    const repair = await models.Repair.findByPk(req.params.id);
    if (!repair) return res.status(404).json({ error: "Repair not found." });
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ error: "Error fetching repair." });
  }
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

module.exports = router;
