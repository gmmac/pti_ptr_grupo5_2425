const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const {
      id,
      name,
      active = "1",
      createdAt,
      updatedAt,
      page = 1,
      pageSize = 10,
      sortField = "name",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("Brand.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (createdAt) {
      where.createdAt = {
        [Op.gte]: new Date(createdAt),
        [Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
      };
    }
    if (updatedAt) {
      where.updatedAt = {
        [Op.gte]: new Date(updatedAt),
        [Op.lt]: new Date(new Date(updatedAt).getTime() + 24 * 60 * 60 * 1000),
      };
    }
    if (active) where.isActive = { [Op.eq]: active };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const orderClause = [];

    if (sortField === "name") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("Brand.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const { count, rows } = await models.Brand.findAndCountAll({
      where,
      attributes: {
        exclude: ["isActive"],
      },
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });
    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: rows,
    });
  } catch (error) {
    console.log(error);
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
      isActive: 1,
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
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/activation/:id", async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    brand.updatedAt = new Date();
    brand.isActive = brand.isActive === "1" ? "0" : "1";
    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Error updating brand." });
  }
});

module.exports = router;
