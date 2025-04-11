const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	try {
		const { search } = req.query;

		const whereCondition = search
			? {
					[Op.or]: [
						{ name: { [Op.iLike]: `%${search}%` } }, // nome do type
					],
			  }
			: {};

		const types = await models.EquipmentType.findAll({
			where: whereCondition,
		});
		res.status(200).json(types);
	} catch (error) {
		res.status(500).json({ message: "Erro ao buscar os modelos." });
	}
});
router.get("/:ID", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
