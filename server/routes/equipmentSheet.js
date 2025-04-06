const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
	try {
		const {
			barcode,
			modelId,
			typeId,
			brandId,
			createdFrom,
			createdTo,
			updatedFrom,
			updatedTo,
			page = 1,
			pageSize = 6,
			orderBy = "createdAt",
			orderDirection = "DESC",
		} = req.query;

		// Construção do objeto 'where' dinamicamente
		const where = {};

		if (barcode) where.barcode = barcode;
		if (createdFrom || createdTo) {
			where.createdAt = {};
			if (createdFrom) where.createdAt[Op.gte] = new Date(createdFrom);
			if (createdTo) where.createdAt[Op.lte] = new Date(createdTo);
		}
		if (updatedFrom || updatedTo) {
			where.updatedAt = {};
			if (updatedFrom) where.updatedAt[Op.gte] = new Date(updatedFrom);
			if (updatedTo) where.updatedAt[Op.lte] = new Date(updatedTo);
		}

		// Condições para relacionamentos
		const modelCondition = modelId ? { id: modelId } : {};
		const typeCondition = typeId ? { id: typeId } : {};
		const brandCondition = brandId ? { id: brandId } : {};

		// Paginação
		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		// Ordenação
		const order = [[orderBy, orderDirection.toUpperCase()]];

		// Busca com contagem para paginação
		const { count, rows } = await models.EquipmentSheet.findAndCountAll({
			where,
			include: [
				{
					model: models.EquipmentModel,
					as: "EquipmentModel",
					where: modelCondition,
					attributes: ["id", "name"],
					include: [
						{
							model: models.Brand,
							as: "Brand",
							where: brandCondition,
							attributes: ["id", "name"],
						},
					],
				},
				{
					model: models.EquipmentType,
					as: "EquipmentType",
					where: typeCondition,
					attributes: ["id", "name"],
				},
			],
			attributes: ["barcode", "createdAt", "updatedAt"],
			limit: parseInt(pageSize),
			offset,
			order,
		});

		const formattedData = rows.map((item) => ({
			Barcode: item.barcode,
			CreatedAt: item.createdAt,
			UpdatedAt: item.updatedAt,
			EquipmentModel: {
				id: item.EquipmentModel.id,
				name: item.EquipmentModel.name,
			},
			EquipmentType: {
				id: item.EquipmentType.id,
				name: item.EquipmentType.name,
			},
		}));
		// Retorno da resposta formatada
		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
		});
	} catch (error) {
		console.error("Error fetching equipment sheets:", error);
		res.status(500).json({ error: "Error fetching equipment sheets." });
	}
});

router.get("/in-stock", async (req, res) => {
	// try {
	const {
		modelId,
		typeId,
		page = 1,
		pageSize = 6,
		orderBy = "recent-date", // Valor padrão
		brandId,
		storeId,
		statusID,
	} = req.query;

	// Construção do objeto 'where' dinamicamente
	const where = {};

	const modelCondition = modelId ? { id: modelId } : {};
	const typeCondition = typeId ? { id: typeId } : {};
	const brandCondition = brandId ? { id: brandId } : {};

	// Calculando o offset com base na página
	const offset = (parseInt(page) - 1) * parseInt(pageSize);

	const usedEquipmentCondition = {};
	if (storeId) usedEquipmentCondition.storeId = storeId;
	if (statusID) usedEquipmentCondition.statusID = statusID;

	let order = [];
	switch (orderBy) {
		case "recent-date":
			order = [["createdAt", "DESC"]];
			break;
		case "oldest-date":
			order = [["createdAt", "ASC"]];
			break;
		case "ASC":
			order = [
				[Sequelize.fn("LOWER", Sequelize.col("EquipmentModel.name")), "ASC"],
			];
			break;
		case "DESC":
			order = [
				[Sequelize.fn("LOWER", Sequelize.col("EquipmentModel.name")), "DESC"],
			];
			break;
		default:
			order = [["createdAt", "DESC"]];
	}

	// Consulta ao banco de dados
	const { count, rows } = await models.EquipmentSheet.findAndCountAll({
		where,
		include: [
			{
				model: models.UsedEquipment,
				as: "UsedEquipments",
				where: usedEquipmentCondition,
				required: true,
			},
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
		limit: parseInt(pageSize),
		offset,
		order,
	});

	const formattedData = rows.map((item) => ({
		Barcode: item.barcode,
		CreatedAt: item.createdAt,
		UpdatedAt: item.updatedAt,
		EquipmentModel: item.EquipmentModel.name,
		Brand: item.EquipmentModel.Brand.name,
		EquipmentType: item.EquipmentType.name,
	}));

	res.json({
		totalItems: count,
		totalPages: Math.ceil(count / pageSize),
		currentPage: parseInt(page),
		pageSize: parseInt(pageSize),
		data: formattedData,
		// data: rows,
	});
	// } catch (error) {
	//     console.error("Error fetching equipment sheets:", error);
	//     res.status(500).json({ error: "Error fetching equipment sheets." });
	// }
});

router.post("/", (req, res) => {});

router.get("/:ID", async (req, res) => {
	try {
		const { modelId, typeId, brandId } = req.query;
		const { ID } = req.params;

		const modelCondition = modelId ? { id: modelId } : {};
		const typeCondition = typeId ? { id: typeId } : {};
		const brandCondition = brandId ? { id: brandId } : {};

		const equipmentSheet = await models.EquipmentSheet.findOne({
			where: { barcode: ID },
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
		});

		if (!equipmentSheet) {
			return res.status(404).json({ error: "EquipmentSheet not found." });
		}

		res.json({ equipmentSheet });
	} catch (error) {
		console.error("Error fetching equipment sheet:", error);
		res.status(500).json({ error: "Error fetching equipment sheet." });
	}
});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

router.get("/:ID/part", (req, res) => {});

module.exports = router;
