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
						{ name: { [Op.iLike]: `%${search}%` } }, // nome do modelo
						{ "$Brand.name$": { [Op.iLike]: `%${search}%` } }, // nome da marca
					],
			  }
			: {};

		const equipmentModels = await models.EquipmentModel.findAll({
			attributes: ["id", "name", "price", "releaseYear"],
			include: [
				{
					model: models.Brand,
					as: "Brand",
					attributes: ["name"],
				},
			],
			where: whereCondition,
			raw: true,
			nest: true,
		});

		const formattedData = equipmentModels.map((item) => ({
			id: item.id,
			name: item.name,
			price: item.price,
			releaseYear: item.releaseYear,
			brandName: item.Brand ? item.Brand.name : null, // Evita erro se Brand for null
		}));

		res.status(200).json(formattedData);
	} catch (error) {
		res.status(500).json({ message: "Erro ao buscar os modelos." });
	}
});

router.post("/", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
