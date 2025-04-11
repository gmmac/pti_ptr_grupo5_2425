const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const {
      name,
      totalSlots,
      availableSlots,
      page = 1,
      pageSize = 10,
      orderBy = "id",
      orderDirection = "ASC"
    } = req.query;

    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (totalSlots) where.totalSlots = parseInt(totalSlots);
    if (availableSlots) where.availableSlots = parseInt(availableSlots);

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const order = [[orderBy, orderDirection.toUpperCase()]];

    const { count, rows } = await models.Warehouse.findAndCountAll({
      where,
      limit: parseInt(pageSize),
      offset,
      order,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({ error: "Error fetching warehouses." });
  }
});


router.post("/", (req, res) => {

});


//EXEMPLO DE ROTA PARA À PARTIR DAS WAREHOUSES TER ACESSO AOS SEUS USED_EQUIPMENTS
router.get("/:ID", async (req, res) => {
  const warehouse = await models.Warehouse.findByPk(req.params.ID, {
    include: {
      model: models.CharityProject,
      include: {
        model: models.UsedEquipment
      }
    }
  });
  
  res.json(warehouse);
});

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
