const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	try {
		const usedEquipment = await models.UsedEquipment.findAll();
		res.status(200).json(usedEquipment);
	} catch (error) {
		res.status(500).json({ message: "Error." });
	}
});

router.get("/price-range/:equipmentId", async (req, res) => {
	try {
		const { equipmentId } = req.params;
		console.log("equipmentId:", equipmentId);

		const priceRes = await models.UsedEquipment.findAll({
			attributes: ["price"],
			where: { equipmentId: { [Op.eq]: equipmentId } },
			order: [["price", "ASC"]],
		});
		const priceRange = priceRes.map((item) => item.price);

		if (priceRange.length === 0) {
			return res.status(200).json({ price: "-" });
		}
		if (priceRange.length === 1) {
			// Se houver apenas um equipamento, retorna apenas o preço
			console.log(priceRange[0]);

			return res.status(200).json({ price: priceRange[0] });
		} else if (priceRange.length > 1) {
			// Se houver mais de um, retorna o preço mínimo e máximo
			res.status(200).json({
				minPrice: Math.min(...priceRange),
				maxPrice: Math.max(...priceRange),
			});
		}
	} catch (error) {
		console.error("Error fetching price range:", error);
		res.status(500).json({ message: "Error fetching price range." });
	}
});

router.post("/", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
