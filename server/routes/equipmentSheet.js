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
			Brand: {
				id: item.EquipmentModel.Brand.id,
				name: item.EquipmentModel.Brand.name,
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

router.get("/teste", async (req, res) => {
	// try {
	const {
		barcode,
		model,
		releaseYear,
		type,
		page = 1,
		pageSize = 10,
		orderBy,
		orderDirection,
	} = req.query;

	console.log("------------------------", req.query);
	const where = {};
	const equipmentModelCondition = {};

	if (barcode) where.barcode = { [Op.like]: `${barcode}%` };
	if (releaseYear)
		equipmentModelCondition.releaseYear = { [Op.eq]: releaseYear };

	if (model) {
		where["$EquipmentModel.name$"] = { [Op.like]: `${model}%` };
	}

	if (type) {
		where["$EquipmentType.name$"] = { [Op.like]: `${type}%` };
	}

	const offset = (parseInt(page) - 1) * parseInt(pageSize);

	let order = [];
	if (orderBy && orderDirection) {
		order = [[orderBy, orderDirection.toUpperCase()]];
	} else {
		order = [["barcode", "ASC"]];
	}

	const { count, rows } = await models.EquipmentSheet.findAndCountAll({
		where,

		include: [
			{
				where: equipmentModelCondition,
				model: models.EquipmentModel,
				attributes: ["name", "releaseYear"],
			},
			{
				model: models.EquipmentType,
				attributes: ["name"],
			},
		],

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
	// } catch (error) {
	//     console.error("Error fetching equipments:", error);
	//     res.status(500).json({ error: "Error fetching equipments." });
	// }
});

router.get("/in-stock", async (req, res) => {
	try {
		const {
			page = 1,
			pageSize = 6,
			orderBy = "recent-date", // Valor padrão
			modelId,
			typeId,
			brandId,
		} = req.query;

		// Construção do objeto 'where' dinamicamente
		const where = {};

		const modelCondition = modelId ? { id: modelId } : {};
		const typeCondition = typeId ? { id: typeId } : {};
		const brandCondition = brandId ? { id: brandId } : {};
		console.log(modelId, typeId, brandId);

		// Calculando o offset com base na página
		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		// Consulta ao banco de dados
		const { count, rows } = await models.EquipmentSheet.findAndCountAll({
			where,
			include: [
				{
					model: models.UsedEquipment,
					where: { purchaseDate: null, putOnSaleDate: { [Op.not]: null } },
					as: "UsedEquipments",
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
		});

		const formattedData = rows.map((item) => ({
			Barcode: item.barcode,
			CreatedAt: item.createdAt,
			UpdatedAt: item.updatedAt,
			EquipmentModel: item.EquipmentModel.name,
			Brand: item.EquipmentModel.Brand.name,
			EquipmentType: item.EquipmentType.name,
		}));

		switch (orderBy) {
			case "recent-date":
				formattedData.sort(
					(a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime()
				);
				break;
			case "oldest-date":
				formattedData.sort(
					(a, b) => a.CreatedAt.getTime() - b.CreatedAt.getTime()
				);
				break;
			case "ASC":
				formattedData.sort((a, b) =>
					a.EquipmentModel.localeCompare(b.EquipmentModel)
				);
				break;
			case "DESC":
				formattedData.sort((a, b) =>
					b.EquipmentModel.localeCompare(a.EquipmentModel)
				);
				break;
		}

		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
			// data: rows,
		});
	} catch (error) {
		console.error("Error fetching equipment sheets:", error);
		res.status(500).json({ error: "Error fetching equipment sheets." });
	}
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
