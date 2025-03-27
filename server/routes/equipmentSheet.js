const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

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

		// Retorno da resposta formatada
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

router.get("/in-stock", async (req, res) => {
	// try {
	const {
		modelId,
		typeId,
		page = 1,
		pageSize = 6,
		orderBy = "createdAt", // Valor padrão
		orderDirection = "DESC", // Valor padrão
		brandId,
	} = req.query;

	// Construção do objeto 'where' dinamicamente
	const where = {};

	const modelCondition = modelId ? { id: modelId } : {};
	const typeCondition = typeId ? { id: typeId } : {};
	const brandCondition = brandId ? { id: brandId } : {};

	// Calculando o offset com base na página
	const offset = (parseInt(page) - 1) * parseInt(pageSize);

	// Construindo a ordenação
	const order = [[orderBy, orderDirection.toUpperCase()]];

	// Consulta ao banco de dados
	const { count, rows } = await models.EquipmentSheet.findAndCountAll({
		where,
		include: [
			// {
			//     model: models.UsedEquipment,  // Inclui os equipamentos usados
			//     as: "UsedEquipments",  // Alias para o relacionamento
			//     required: true,  // Isso garante que só as EquipmentSheet com UsedEquipments associados sejam retornadas
			// },
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

	// Retorno da resposta com a paginação
	res.json({
		totalItems: count,
		totalPages: Math.ceil(count / pageSize),
		currentPage: parseInt(page),
		pageSize: parseInt(pageSize),
		data: rows,
	});
	// } catch (error) {
	//     console.error("Error fetching equipment sheets:", error);
	//     res.status(500).json({ error: "Error fetching equipment sheets." });
	// }
});

router.post("/", async (req, res) => {
	try {
		console.log(req.body);

		const { barcode, model, type } = req.body;

		const newEquipmentSheet = await models.EquipmentSheet.create({
			barcode: barcode,
			model: model,
			type: type,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		res.status(201).json(newEquipmentSheet);
	} catch (error) {
		console.error("Error creating equipment sheet:", error);
		res.status(500).json({ error: "Error creating equipment sheet." });
	}
});

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

router.put("/:ID", async (req, res) => {
	const { barcode, model, type } = req.body;
	const equipmentSheet = await models.EquipmentSheet.findByPk(req.params.ID);
	if (!equipmentSheet) {
		return res.status(404).json({ error: "EquipmentSheet not found." });
	}

	await equipmentSheet.update({ barcode, model, type });
	res.json(equipmentSheet);
});

router.delete("/:ID", async (req, res) => {
	try {
		const equipmentSheet = await models.EquipmentSheet.findByPk(req.params.ID);
		if (!equipmentSheet) {
			return res.status(404).json({ error: "EquipmentSheet not found." });
		}

		await models.UsedEquipment.destroy({
			where: { equipmentId: req.params.ID },
		});

		await equipmentSheet.destroy();
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting equipment sheet:", error);
		res.status(500).json({ error: "Error deleting equipment sheet." });
	}
});

router.get("/:ID/part", (req, res) => {});

module.exports = router;
