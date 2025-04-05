const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const projectStatus = await models.ProjectStatus.findAll();
    res.status(200).json({
      data: projectStatus,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching repair status." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { state } = req.body;
    const projectStatus = await models.ProjectStatus.create({
      state,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      data: projectStatus,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating repair status." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const projectStatus = await models.ProjectStatus.findByPk(req.params.id);
    if (!projectStatus)
      return res.status(404).json({ error: "Repair Status not found." });
    res.status(200).json(projectStatus);
  } catch (error) {
    res.status(500).json({ error: "Error fetching repair status." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { state } = req.body;
    const projectStatus = await models.ProjectStatus.findByPk(req.params.id);
    if (!projectStatus) {
      return res.status(404).json({ error: "Repair Status not found" });
    }
    await projectStatus.update({
      state,
      updatedAt: new Date(),
    });
    res.status(200).json(projectStatus);
  } catch (error) {
    res.status(500).json({ error: "Error updating repair status." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const projectStatus = await models.ProjectStatus.findByPk(req.params.id);
    if (!projectStatus) {
      return res.status(404).json({ error: "Repair status not found" });
    }
    await projectStatus.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
