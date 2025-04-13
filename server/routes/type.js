const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

// router.get("/", async (req, res) => {
// 	try {
// 		const { search } = req.query;

// 		const whereCondition = search
// 			? {
// 					[Op.or]: [
// 						{ name: { [Op.iLike]: `%${search}%` } }, // nome do type
// 					],
// 			  }
// 			: {};

// 		const types = await models.EquipmentType.findAll({
// 			where: whereCondition,
// 		});
// 		res.status(200).json(types);
// 	} catch (error) {
// 		res.status(500).json({ message: "Erro ao buscar os modelos." });
// 	}
// });

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
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("EquipmentType.id"), "varchar"),
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
        Sequelize.fn("LOWER", Sequelize.col("EquipmentType.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const { count, rows } = await models.EquipmentType.findAndCountAll({
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
    res.status(500).json({ error: "Error fetching equipment types." });
  }
});

router.get("/:ID", (req, res) => {});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Equipment Type name is required." });
    }

    const exists = await models.EquipmentType.findOne({
      where: { name },
    });
    if (exists) {
      return res
        .status(400)
        .json({ error: "An equipment type with this name already exists." });
    }
    const equipmentType = await models.EquipmentType.create({
      name,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      data: equipmentType,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating equipment type." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const equipmentType = await models.EquipmentType.findByPk(req.params.id);
    if (!equipmentType) {
      return res.status(404).json({ error: "Equipment Type not found" });
    }
    const exists = await models.EquipmentType.findOne({
      where: { name },
    });
    if (exists) {
      return res
        .status(400)
        .json({ error: "An equipment type with this name already exists." });
    }
    await equipmentType.update({
      name,
      updatedAt: new Date(),
    });
    res.status(200).json(equipmentType);
  } catch (error) {
    res.status(500).json({ error: "Error updating equipment type." });
  }
});

router.delete("/:ID", (req, res) => {});

router.patch("/activation/:id", async (req, res) => {
  try {
    const equipmentType = await models.EquipmentType.findByPk(req.params.id);
    if (!equipmentType) {
      return res.status(404).json({ error: "Equipment Type not found" });
    }
    equipmentType.updatedAt = new Date();
    equipmentType.isActive = equipmentType.isActive === "1" ? "0" : "1";
    await equipmentType.save();
    res.status(200).json(equipmentType);
  } catch (error) {
    res.status(500).json({ error: "Error updating equipment type." });
  }
});

module.exports = router;
