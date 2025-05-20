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
      price,
      arriveTime,
      active = "1",
      page = 1,
      pageSize = 10,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("Part.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (price)
      where.price = sequelize.where(
        sequelize.cast(sequelize.col("price"), "varchar"),
        { [Op.iLike]: `${price}%` }
      );
    if (arriveTime)
      where.arriveTime = sequelize.where(
        sequelize.cast(sequelize.col("arriveTime"), "varchar"),
        { [Op.iLike]: `%${arriveTime}%` }
      );
    if (active) where.isActive = { [Op.eq]: active };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const orderClause = [];

    if (sortField === "name") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("Part.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      // Para outros campos, use o nome da tabela corretamente
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const { count, rows } = await models.Part.findAndCountAll({
      where,
      attributes: ["id", "name", "price", "arriveTime"],
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
    console.error("Erro no GET /model:", error);
    res.status(500).json({ error: "Error fetching parts." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, arriveTime } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Part name is required." });
    }
    if (!price) {
      return res.status(400).json({ error: "Part price is required." });
    }
    if (!arriveTime) {
      return res.status(400).json({ error: "Part arrival time is required." });
    }

    const exists = await models.Part.findOne({
      where: { name, price, arriveTime },
    });
    if (exists) {
      return res.status(400).json({ error: "This part already exists." });
    }
    const part = await models.Part.create({
      name,
      price,
      arriveTime,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      data: part,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating part." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, price, arriveTime } = req.body;
    const part = await models.Part.findByPk(req.params.id);
    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }
    if (!name) {
      return res.status(400).json({ error: "Part name is required." });
    }
    if (!price) {
      return res.status(400).json({ error: "Part price is required." });
    }
    if (!arriveTime) {
      return res.status(400).json({ error: "Part arrival time is required." });
    }
    const exists = await models.Part.findOne({
      where: { name, price, arriveTime },
    });
    if (exists) {
      return res.status(400).json({ error: "This part already exists." });
    }
    await part.update({
      name,
      price,
      arriveTime,
      updatedAt: new Date(),
    });
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ error: "Error updating part." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const part = await models.Part.findByPk(req.params.id);
    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }
    await part.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/activation/:id", async (req, res) => {
  try {
    const part = await models.Part.findByPk(req.params.id);
    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }
    part.updatedAt = new Date();
    part.isActive = part.isActive === "1" ? "0" : "1";
    await part.save();
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ error: "Error updating part." });
  }
});

module.exports = router;
