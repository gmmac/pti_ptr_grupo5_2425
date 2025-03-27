const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 10, orderBy, orderDirection } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let order = [];
    if (orderBy && orderDirection) {
      order = [[orderBy, orderDirection.toUpperCase()]];
    } else {
      order = [["name", "ASC"]];
    }

    const { count, rows } = await models.Brand.findAndCountAll({
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
    res.status(500).json({ error: "Error fetching brands." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brand name is required." });
    }

    const exists = await models.Brand.findOne({
      where: { name },
    });
    if (exists) {
      return res
        .status(400)
        .json({ error: "A brand with this name already exists." });
    }
    const brand = await models.Brand.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      data: brand,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating brand." });
  }
});

router.get("/name", async (req, res) => {
  console.log(req.body);
  try {
    const brand = await models.Brand.findOne({
      where: { name: req.body.name },
    });
    if (!brand) return res.status(404).json({ error: "Brand not found." });
    res.status(200).json({ brand });
  } catch (error) {
    res.status(500).json({ error: "Error fetching brand." });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const brand = await models.Brand.findByPk(req.params.id);
//     if (!brand) return res.status(404).json({ error: "Brand not found." });
//     res.status(200).json({ brand });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching brand." });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    const exists = await models.Brand.findOne({
      where: { name },
    });
    if (exists) {
      return res
        .status(400)
        .json({ error: "A brand with this name already exists." });
    }
    await brand.update({
      name,
      updatedAt: new Date(),
    });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Error updating brand." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    await brand.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
