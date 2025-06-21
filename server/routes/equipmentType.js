const express = require("express");
const router = express.Router();
const { Op, fn, col, where: sequelizeWhere } = require("sequelize");
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const {
			name,
			page = 1,
			pageSize = 5,
			orderBy = "id",
			orderDirection = "ASC",
		} = req.query;

		let where = {};

		if (name) {
			where = sequelizeWhere(fn("LOWER", col("name")), {
				[Op.like]: `%${name.toLowerCase()}%`,
			});
		}

		const offset = (parseInt(page) - 1) * parseInt(pageSize);
		const order = [[orderBy, orderDirection.toUpperCase()]];

		const { count, rows } = await models.EquipmentType.findAndCountAll({
			where,
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
		console.error("Error fetching equipment types:", error);
		res.status(500).json({ error: "Error fetching equipment types." });
	}
});

router.post("/", async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: "Name is required." });
		}

		const newType = await models.EquipmentType.create({ name });
		res.status(201).json(newType);
	} catch (error) {
		console.error("Error creating equipment type:", error);
		res.status(500).json({ error: "Error creating equipment type." });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const equipmentType = await models.EquipmentType.findByPk(id);

		if (!equipmentType) {
			return res.status(404).json({ error: "Equipment type not found." });
		}

		res.status(200).json(equipmentType);
	} catch (error) {
		console.error("Error fetching equipment type:", error);
		res.status(500).json({ error: "Error fetching equipment type." });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const { name } = req.body;

		const equipmentType = await models.EquipmentType.findByPk(id);
		if (!equipmentType) {
			return res.status(404).json({ error: "Equipment type not found." });
		}

		if (!name) {
			return res.status(400).json({ error: "Name is required." });
		}

		equipmentType.name = name;
		await equipmentType.save();

		res.status(200).json(equipmentType);
	} catch (error) {
		console.error("Error updating equipment type:", error);
		res.status(500).json({ error: "Error updating equipment type." });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const equipmentType = await models.EquipmentType.findByPk(id);

		if (!equipmentType) {
			return res.status(404).json({ error: "Equipment type not found." });
		}

		await equipmentType.destroy();
		res.status(200).json({ message: "Equipment type deleted successfully." });
	} catch (error) {
		console.error("Error deleting equipment type:", error);
		res.status(500).json({ error: "Error deleting equipment type." });
	}
});

module.exports = router;
