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
      pageSize = 6,
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

router.post("/", async (req, res) => {
  try {
    const { name, totalSlots, availableSlots } = req.body;

    if (!name || totalSlots == null || availableSlots == null) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newWarehouse = await models.Warehouse.create({
      name: name,
      totalSlots,
      availableSlots,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error("Error creating warehouse:", error);
    res.status(500).json({ error: "Error creating warehouse." });
  }
});


router.put("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const { name, totalSlots, availableSlots } = req.body;

    const warehouse = await models.Warehouse.findByPk(ID);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse does not exists." });
    }

    await warehouse.update({
      name: name ?? warehouse.name,
      totalSlots: totalSlots ?? warehouse.totalSlots,
      availableSlots: availableSlots ?? warehouse.availableSlots,
    });

    res.json(warehouse);
  } catch (error) {
    console.error("Error updating warehouse:", error);
    res.status(500).json({ error: "Error updating warehouse." });
  }
});


router.delete("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;

    // Verificar se existe algum projeto associado a este armazém
    const projectsUsingWarehouse = await models.CharityProject.findOne({
      where: { warehouseID: ID }
    });

    if (projectsUsingWarehouse) {
      return res.status(400).json({
        message: "This warehouse is linked to one or more charity projects and cannot be deleted."
      });
    }

    const warehouse = await models.Warehouse.findByPk(ID);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }

    await warehouse.destroy();
    res.json({ message: "Warehouse deleted successfully." });
  } catch (error) {
    console.error("Error deleting warehouse:", error);
    res.status(500).json({ error: "Error deleting warehouse." });
  }
});




module.exports = router;
