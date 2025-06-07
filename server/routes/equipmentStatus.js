// routes/equipmentStatus.js
const express = require("express");
const router  = express.Router();
const { Op }  = require("sequelize");      
const models  = require("../models");

/* -----------------------------------------------------------
 * GET /  ?search=abc   &page=1&pageSize=20
 * ---------------------------------------------------------*/
router.get("/", async (req, res) => {
  const {
    search = "",       
    page   = 1,        
    pageSize = 10,     
    order  = "ASC",    // ASC | DESC
  } = req.query;

  const where = {};
  if (search.trim() !== "") {
    where.state = { [Op.iLike]: `%${search.trim()}%` };  
  }

  const limit  = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  try {
    const { count, rows } = await models.EquipmentStatus.findAndCountAll({
      where,
      order: [["state", order.toUpperCase() === "DESC" ? "DESC" : "ASC"]],
      limit,
      offset,
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      pageSize: limit,
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching equipment statuses." });
  }
});


/* -----------------------------------------------------------
 * POST /               →  cria um novo estado
 * body: { state: string }
 * ---------------------------------------------------------*/
router.post("/", async (req, res) => {
  const { state } = req.body;

  if (!state || state.trim() === "") {
    return res
      .status(400)
      .json({ message: "Field 'state' is required and cannot be empty." });
  }

  try {
    const newStatus = await models.EquipmentStatus.create({ state: state.trim() });
    res.status(201).json(newStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating equipment status." });
  }
});

/* -----------------------------------------------------------
 * GET /:ID             →  devolve um único estado
 * ---------------------------------------------------------*/
router.get("/:ID", async (req, res) => {
  try {
    const status = await models.EquipmentStatus.findByPk(req.params.ID);
    if (!status) {
      return res
        .status(404)
        .json({ message: `EquipmentStatus ${req.params.ID} not found.` });
    }
    res.status(200).json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching equipment status." });
  }
});

/* -----------------------------------------------------------
 * PUT /:ID             →  actualiza um estado
 * body: { state: string }
 * ---------------------------------------------------------*/
router.put("/:ID", async (req, res) => {
  const { state } = req.body;

  if (!state || state.trim() === "") {
    return res
      .status(400)
      .json({ message: "Field 'state' is required and cannot be empty." });
  }

  try {
    const status = await models.EquipmentStatus.findByPk(req.params.ID);
    if (!status) {
      return res
        .status(404)
        .json({ message: `EquipmentStatus ${req.params.ID} not found.` });
    }

    status.state = state.trim();
    await status.save();

    res.status(200).json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating equipment status." });
  }
});

/* -----------------------------------------------------------
 * DELETE /:ID          →  apaga um estado
 * ---------------------------------------------------------*/
router.delete("/:ID", async (req, res) => {
  try {
    const deletedRows = await models.EquipmentStatus.destroy({
      where: { id: req.params.ID },
    });

    if (!deletedRows) {
      return res
        .status(404)
        .json({ message: `EquipmentStatus ${req.params.ID} not found.` });
    }

    res.status(204).send();           // 204 No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting equipment status." });
  }
});

module.exports = router;
