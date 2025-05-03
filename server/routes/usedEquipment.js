const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, where } = require("sequelize");

router.get("/usedEquipmentRepairs", async (req, res) => {
	try {
		const {
			id,
			price,
			equipmentId,
			storeId,
			page = 1,
			pageSize = 10,
			orderBy,
			orderDirection,
		} = req.query;

		const where = {};

		// if (id) where.id = { [Op.like]: `${id}%` };
		// if (price) where.price = { [Op.like]: `${price}%` };
		// if (equipmentId) where.equipmentId = { [Op.like]: `${equipmentId}%` };
		// if (storeId) where.storeId = { [Op.like]: `%${storeId}%` };

		// if (putOnSaleDate) {
		// 	where.putOnSaleDate = {
		// 		[Op.gte]: new Date(putOnSaleDate),
		// 		[Op.lt]: new Date(new Date(putOnSaleDate).getTime() + 24 * 60 * 60 * 1000),
		// 	};
		// }

		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		let order = [];
		if (orderBy && orderDirection) {
			order = [[orderBy, orderDirection.toUpperCase()]];
		} else {
			order = [["id", "ASC"]];
		}

		const { count, rows } = await models.UsedEquipment.findAndCountAll({
			where,
			limit: parseInt(pageSize),
			offset,
			order,
		});
		
		const formattedData = rows.map((item) => ({
			id: item.id,
			price: item.price,
			equipmentId: item.equipmentId,
			storeId: item.storeId,
		}));
		console.log("DATA: ", formattedData)
		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
		});
	} catch (error) {
		console.error("Error fetching clients:", error);
		res.status(500).json({ error: "Error fetching clients." });
	}
});

router.get("/:ID", async (req, res) => {
	try {
		const { ID } = req.params;

		const usedEquipments = await models.UsedEquipment.findAll({
			where: { equipmentId: ID },
			include: [
				{ model: models.Store, as: "Store", attributes: ["name"] },
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					attributes: ["state"],
				},
			],
		});

		res.json({ usedEquipments });
	} catch (error) {
		console.error("Error fetching used equipments:", error);
		res.status(500).json({ error: "Error fetching used equipments." });
	}
});

// ver os que estão disponiveis para compra
router.get("/in-stock/:ID", async (req, res) => {
	try {
		const { ID } = req.params;

		const usedEquipments = await models.UsedEquipment.findAll({
			where: {
				equipmentId: ID,
				purchaseDate: null,
				putOnSaleDate: { [Op.not]: null },
			},
			include: [
				{ model: models.Store, as: "Store", attributes: ["name"] },
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					attributes: ["state"],
				},
			],
		});

		res.json({ usedEquipments });
	} catch (error) {
		console.error("Error fetching used equipments:", error);
		res.status(500).json({ error: "Error fetching used equipments." });
	}
});

router.get("/price-range/:equipmentId", async (req, res) => {
	try {
		const { equipmentId } = req.params;

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
