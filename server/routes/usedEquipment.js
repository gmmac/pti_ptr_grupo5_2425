const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const models = require("../models");

// ver os que estão disponiveis para compra
router.get("/in-stock", async (req, res) => {
	try {
		const {
			equipmentId,
			page = 1,
			pageSize = 6,
			orderBy = "recent-date",
			stateId,
		} = req.query;

		const offset = (parseInt(page) - 1) * parseInt(pageSize);
		const limit = parseInt(pageSize);

		const equipmentIdCondition = equipmentId
			? { equipmentId: equipmentId }
			: {};
		const stateCondition = stateId ? { id: stateId } : {};

		const { count, rows } = await models.UsedEquipment.findAndCountAll({
			where: {
				purchaseDate: null,
				putOnSaleDate: { [Op.not]: null },
				...equipmentIdCondition,
			},
			include: [
				{ model: models.Store, as: "Store", attributes: ["name"] },
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					where: stateCondition,
					attributes: ["state"],
				},
			],
			limit,
			offset,
		});

		const formattedData = rows.map((item) => ({
			ID: item.id,
			Price: parseFloat(item.price),
			PutOnSaleDate: item.putOnSaleDate,
			CreatedAt: item.createdAt,
			UpdatedAt: item.updatedAt,
			Store: item.Store?.name,
			State: item.EquipmentStatus?.state,
		}));

		switch (orderBy) {
			case "price-asc":
				formattedData.sort((a, b) => a.Price - b.Price);
				break;
			case "price-desc":
				formattedData.sort((a, b) => b.Price - a.Price);
				break;
			case "oldest-date":
				formattedData.sort(
					(a, b) => new Date(a.PutOnSaleDate) - new Date(b.PutOnSaleDate)
				);
				break;
			case "recent-date":
			default:
				formattedData.sort(
					(a, b) => new Date(b.PutOnSaleDate) - new Date(a.PutOnSaleDate)
				);
				break;
		}

		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
		});
	} catch (error) {
		console.error("Error fetching used equipments:", error);
		res.status(500).json({ error: "Error fetching used equipments." });
	}
});

router.get("/", async (req, res) => {
	try {
		const {
			Barcode,
			EquipmentModel,
			EquipmentType,
			Brand,
			Store,
			Status,
			active = "1",
			page = 1,
			pageSize = 6,
			sortField = "id",
			sortOrder = "ASC",
		} = req.query;

		const offset = (parseInt(page) - 1) * parseInt(pageSize);
		const orderClause = [];

		// Ordenação com alias e colunas associadas
		if (sortField === "Brand") {
			orderClause.push([
				Sequelize.fn(
					"LOWER",
					Sequelize.col("EquipmentSheet.EquipmentModel.Brand.name")
				),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		} else if (sortField === "EquipmentModel") {
			orderClause.push([
				Sequelize.fn(
					"LOWER",
					Sequelize.col("EquipmentSheet.EquipmentModel.name")
				),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		} else if (sortField === "EquipmentType") {
			orderClause.push([
				Sequelize.fn(
					"LOWER",
					Sequelize.col("EquipmentSheet.EquipmentType.name")
				),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		} else if (sortField === "Store") {
			orderClause.push([
				Sequelize.fn("LOWER", Sequelize.col("Store.name")),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		} else if (sortField) {
			orderClause.push([
				Sequelize.col(sortField),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		}

		const where = {};
		const sheetWhere = {};

		if (Barcode) sheetWhere.barcode = { [Op.iLike]: `%${Barcode}%` };
		if (EquipmentModel)
			sheetWhere["$EquipmentModel.name$"] = {
				[Op.iLike]: `%${EquipmentModel}%`,
			};
		if (EquipmentType)
			sheetWhere["$EquipmentType.name$"] = { [Op.iLike]: `%${EquipmentType}%` };
		if (Brand)
			sheetWhere["$EquipmentModel.Brand.name$"] = { [Op.iLike]: `%${Brand}%` };
		if (Store) where["$Store.name$"] = { [Op.iLike]: `%${Store}%` };
		if (Status) where.statusID = { [Op.eq]: Status };
		if (active) sheetWhere.isActive = { [Op.eq]: active };

		where.action = {
			[Op.or]: [{ [Op.ne]: "D" }, { [Op.is]: null }, { [Op.eq]: "S" }],
		};

		const { count, rows } = await models.UsedEquipment.findAndCountAll({
			where,
			include: [
				{
					model: models.EquipmentSheet,
					where: sheetWhere,
					attributes: ["barcode", "createdAt", "updatedAt"],
					include: [
						{
							model: models.EquipmentModel,
							as: "EquipmentModel",
							attributes: ["id", "name"],
							include: [
								{
									model: models.Brand,
									as: "Brand",
									attributes: ["id", "name"],
								},
							],
						},
						{
							model: models.EquipmentType,
							as: "EquipmentType",
							attributes: ["id", "name"],
						},
					],
				},
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					attributes: ["id", "state"],
				},
				{
					model: models.Store,
					attributes: ["nipc", "name"],
				},
			],
			limit: parseInt(pageSize),
			offset,
			order: orderClause,
		});

		const formattedData = rows.map((item) => ({
			id: item.id,
			price: item.price,
			putOnSaleDate: item.putOnSaleDate,
			purchaseDate: item.purchaseDate,
			action: item.action,
			EquipmentStatus: item.EquipmentStatus,
			Store: item.Store,
			EquipmentSheet: {
				barcode: item.EquipmentSheet.barcode,
				EquipmentModel: item.EquipmentSheet.EquipmentModel,
				EquipmentType: item.EquipmentSheet.EquipmentType,
				createdAt: item.EquipmentSheet.createdAt,
				updatedAt: item.EquipmentSheet.updatedAt,
			},
		}));

		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
		});
	} catch (error) {
		console.error("Error fetching used equipment:", error);
		res.status(500).json({ error: "Error fetching used equipment." });
	}
});

router.get("/displayTable", async (req, res) => {
	try {
		const {
			Barcode,
			EquipmentType,
			BrandModel,
			Store,
			Status,
			active = "1",
			page = 1,
			pageSize = 6,
			sortField = "id",
			sortOrder = "ASC",
		} = req.query;

		// 1) Concat para Brand + Model
		const brandModelConcat = Sequelize.fn(
			"concat",
			Sequelize.col("EquipmentSheet.EquipmentModel.Brand.name"),
			" ",
			Sequelize.col("EquipmentSheet.EquipmentModel.name")
		);

		// 2) Filtros raiz (action e status)
		const rootWhere = {
			action: {
				[Op.or]: [{ [Op.ne]: "D" }, { [Op.is]: null }, { [Op.eq]: "S" }],
			},
			...(Status && { statusID: Status }),
		};

		// 3) Filtros de EquipmentSheet
		const sheetWhere = {};
		if (Barcode) sheetWhere.barcode = { [Op.iLike]: `${Barcode}%` };
		sheetWhere.isActive = { [Op.eq]: active };

		// 4) Filtros de EquipmentType e Store
		const typeIncludeWhere = EquipmentType
			? { name: { [Op.iLike]: `%${EquipmentType}%` } }
			: {};
		const storeIncludeWhere = Store
			? { name: { [Op.iLike]: `%${Store}%` } }
			: {};

		// 5) Ordenação e paginação
		const offset = (parseInt(page) - 1) * parseInt(pageSize);
		const orderClause = [];
		if (sortField === "BrandModel") {
			orderClause.push([
				Sequelize.fn("LOWER", brandModelConcat),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		} else if (sortField === "EquipmentType") {
			orderClause.push([
				Sequelize.fn(
					"LOWER",
					Sequelize.col("EquipmentSheet.EquipmentType.name")
				),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		} else {
			orderClause.push([
				Sequelize.col(sortField),
				sortOrder == -1 ? "DESC" : "ASC",
			]);
		}

		// 6) Query com include e filtro de BrandModel no include
		const { count, rows } = await models.UsedEquipment.findAndCountAll({
			where: rootWhere,
			include: [
				{
					model: models.EquipmentSheet,
					where: sheetWhere,
					attributes: ["barcode", "createdAt", "updatedAt"],
					include: [
						{
							model: models.EquipmentModel,
							as: "EquipmentModel",
							required: !!BrandModel,
							where: BrandModel
								? Sequelize.where(Sequelize.fn("LOWER", brandModelConcat), {
										[Op.iLike]: `%${BrandModel.toLowerCase()}%`,
								  })
								: undefined,
							attributes: ["id", "name"],
							include: [
								{
									model: models.Brand,
									as: "Brand",
									required: !!BrandModel,
									attributes: ["id", "name"],
								},
							],
						},
						{
							model: models.EquipmentType,
							as: "EquipmentType",
							attributes: ["id", "name"],
							where: typeIncludeWhere,
						},
					],
				},
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					attributes: ["id", "state"],
				},
				{
					model: models.Store,
					attributes: ["nipc", "name"],
					where: storeIncludeWhere,
				},
			],
			limit: parseInt(pageSize),
			offset,
			order: orderClause,
		});

		// 7) Formatação da resposta
		const formattedData = rows.map((item) => ({
			id: item.id,
			price: item.price,
			putOnSaleDate: item.putOnSaleDate,
			purchaseDate: item.purchaseDate,
			action: item.action,
			EquipmentStatus: item.EquipmentStatus,
			Store: item.Store,
			EquipmentSheet: {
				barcode: item.EquipmentSheet.barcode,
				brandModel:
					item.EquipmentSheet.EquipmentModel.Brand.name +
					" " +
					item.EquipmentSheet.EquipmentModel.name,
				EquipmentModel: item.EquipmentSheet.EquipmentModel,
				EquipmentType: item.EquipmentSheet.EquipmentType,
				createdAt: item.EquipmentSheet.createdAt,
				updatedAt: item.EquipmentSheet.updatedAt,
			},
		}));

		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
		});
	} catch (error) {
		console.error("Error fetching used equipment:", error);
		res.status(500).json({ error: "Error fetching used equipment." });
	}
});

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

		if (id && !isNaN(parseInt(id))) where.id = parseInt(id);
		if (price && !isNaN(parseFloat(price))) where.price = parseFloat(price);
		if (equipmentId) where.equipmentId = equipmentId;
		if (storeId) where.storeId = storeId;

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

router.get("/by-used-equiment-id/:ID", async (req, res) => {
	try {
		const { ID } = req.params;

		const usedEquipments = await models.UsedEquipment.findOne({
			where: { id: ID },
			include: [
				{
					model: models.EquipmentSheet,
					as: "EquipmentSheet",
					include: [
						{
							model: models.EquipmentModel,
							as: "EquipmentModel", // este 'as' tem de bater certo com o que definiste no `belongsTo`
							attributes: ["name"],
						},
					],
				},
				{
					model: models.Store,
					as: "Store",
					attributes: ["name"],
				},
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
