const express = require("express");
const router = express.Router();
const models = require("../models");

const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	try {
		const EquipmentSheets = await models.User.findAll();
		res.json(EquipmentSheets);
	} catch (error) {
		console.error("Error fetching equipment sheets:", error);
		res.status(500).json({ error: "Error fetching equipment sheets." });
	}
});

router.get("/in-stock", async (req, res) => {
	try {
		const {
			// name,
			modelId,
			typeId,
			page = 1,
			pageSize = 6,
			orderBy,
			orderDirection,
			brandId,
		} = req.query;
		const where = {};

		// if (name) {
		// 	where.name = { [Op.like]: `%${name}%` };
		// }

		const modelCondition = modelId ? { id: modelId } : {};
		const typeCondition = typeId ? { id: typeId } : {};
		const brandCondition = brandId ? { id: brandId } : {};

		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		let order = [];
		if (orderBy && orderDirection) {
			order = [[orderBy, orderDirection.toUpperCase()]];
		} else {
			order = [["createdAt", "DESC"]];
		}

		console.log("Order applied:", order);

		const { count, rows } = await models.EquipmentSheet.findAndCountAll({
			where,
			include: [
				{
					model: models.EquipmentModel,
					as: "EquipmentModel",
					where: modelCondition,
					attributes: ["name", "price", "releaseYear"],
					include: [
						{
							model: models.Brand,
							as: "Brand",
							where: brandCondition,
							attributes: ["name"],
						},
					],
				},
				{
					model: models.EquipmentType,
					as: "EquipmentType",
					where: typeCondition,
					attributes: ["name"],
				},
			],
			attributes: ["barcode"],
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
		console.error("Error fetching equipment sheets:", error);
		res.status(500).json({ error: "Error fetching equipment sheets." });
	}
});

router.post("/", (req, res) => {});

router.get("/:ID", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

router.get("/:ID/part", (req, res) => {});

module.exports = router;
