const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const repairStatus = await models.RepairStatus.findAll();
    res.json({
      data: repairStatus,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching repair status." });
  }
});

router.post("/", (req, res) => {});

router.get("/:ID", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
