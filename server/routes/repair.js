const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const repair = await models.Repair.findAll();
    res.status(200).json({
      data: repair,
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
