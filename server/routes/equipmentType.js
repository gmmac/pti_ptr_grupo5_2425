const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const models = require('../models');

router.get("/", async (req, res) => {
  try {
    const {
      name,
      page = 1,
      pageSize = 5,
      orderBy = "id",
      orderDirection = "ASC"
    } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const order = [[orderBy, orderDirection.toUpperCase()]];

    const { count, rows } = await models.EquipmentType.findAndCountAll({
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
    console.error("Error fetching equipment types:", error);
    res.status(500).json({ error: "Error fetching equipment types." });
  }
});


router.post("/", (req, res) => {

});

router.get("/:ID", (req, res) => {

});

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
