const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	try {
		const interests = await models.User.findAll();
		res.json(interests);
	} catch (error) {
		console.error("Error fetching interests:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.get("/user/:userNic", async (req, res) => {
	try {
		const { userNic } = req.params;

		const allInterests = await models.Interest.findAll({
			where: { clientNic: userNic },
			attributes: [
				"id",
				"equipmentSheetID",
				"maxLaunchYear",
				"minLaunchYear",
				"minPrice",
				"maxPrice",
				"createdAt",
				"updatedAt",
				"description",
			],
			include: [
				{ model: models.Brand, as: "brand", attributes: ["id", "name"] },
				{
					model: models.EquipmentModel,
					as: "model",
					attributes: ["id", "name"],
				},
				{ model: models.EquipmentType, as: "type", attributes: ["id", "name"] },
				{
					model: models.EquipmentStatus,
					as: "equipmentStatus",
					attributes: ["id", "state"],
				},
				{
					model: models.PreferredStoresInterets,
					as: "preferredStores",
					include: [
						{
							model: models.Store,
							as: "store",
							attributes: ["nipc", "name", "email", "phone", "address"],
						},
					],
				},
			],
		});

		res.json(allInterests);
	} catch (error) {
		console.error("Error fetching all interests for user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.get("/folder/:userNic/:folderInterestId", async (req, res) => {
	try {
		const { userNic, folderInterestId } = req.params;

		// 1. Obter todos os interestId associados à pasta
		const links = await models.FolderInterestEquipments.findAll({
			where: { folderInterestId },
			attributes: ["interestId"],
		});

		const interestIds = links.map((link) => link.interestId);

		// 2. Buscar os interesses com os mesmos includes da outra rota
		const interests = await models.Interest.findAll({
			where: {
				id: interestIds,
				clientNic: userNic,
			},
			attributes: [
				"id",
				"equipmentSheetID",
				"maxLaunchYear",
				"minLaunchYear",
				"minPrice",
				"maxPrice",
				"createdAt",
				"updatedAt",
				"description",
			],
			include: [
				{ model: models.Brand, as: "brand", attributes: ["id", "name"] },
				{
					model: models.EquipmentModel,
					as: "model",
					attributes: ["id", "name"],
				},
				{ model: models.EquipmentType, as: "type", attributes: ["id", "name"] },
				{
					model: models.EquipmentStatus,
					as: "equipmentStatus",
					attributes: ["id", "state"],
				},
				{
					model: models.PreferredStoresInterets,
					as: "preferredStores",
					include: [
						{
							model: models.Store,
							as: "store",
							attributes: ["nipc", "name", "email", "phone", "address"],
						},
					],
				},
			],
		});

		res.json(interests);
	} catch (error) {
		console.error("Error fetching folder interests:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.get("/not-in-folder/:userNic/:folderInterestId", async (req, res) => {
	try {
		const { userNic, folderInterestId } = req.params;

		//todos os interestId já na pasta
		const links = await models.FolderInterestEquipments.findAll({
			where: { folderInterestId },
			attributes: ["interestId"],
		});

		const alreadyInFolder = links.map((link) => link.interestId);

		//todos os interesses do userNic que NÃO estão na pasta
		const interests = await models.Interest.findAll({
			where: {
				clientNic: userNic,
				id: {
					[Op.notIn]: alreadyInFolder.length > 0 ? alreadyInFolder : [0],
				},
			},
			attributes: [
				"id",
				"equipmentSheetID",
				"maxLaunchYear",
				"minLaunchYear",
				"minPrice",
				"maxPrice",
				"description",
				"createdAt",
				"updatedAt",
			],
			include: [
				{
					model: models.Brand,
					as: "brand",
					attributes: ["id", "name"],
				},
				{
					model: models.EquipmentModel,
					as: "model",
					attributes: ["id", "name"],
				},
				{
					model: models.EquipmentType,
					as: "type",
					attributes: ["id", "name"],
				},
				{
					model: models.EquipmentStatus,
					as: "equipmentStatus",
					attributes: ["id", "state"],
				},
				{
					model: models.PreferredStoresInterets,
					as: "preferredStores",
					include: [
						{
							model: models.Store,
							as: "store",
							attributes: ["nipc", "name", "email", "phone", "address"],
						},
					],
				},
			],
		});

		res.json(interests);
	} catch (error) {
		console.error("Error fetching interests not in folder:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/", async (req, res) => {
	try {
		const {
			clientNic,
			brandID,
			modelID,
			typeID,
			equipmentSheetID,
			equipmentStatusID,
			minLaunchYear,
			maxLaunchYear,
			minPrice,
			maxPrice,
			preferredStoreIDs,
			description,
		} = req.body;

		// Criação do Interest
		const newInterest = await models.Interest.create({
			clientNic: clientNic,
			brandID: brandID || null,
			modelID: modelID || null,
			typeID: typeID || null,
			equipmentSheetID: equipmentSheetID || null,
			equipmentStatusID: equipmentStatusID || null,
			minLaunchYear: minLaunchYear || null,
			maxLaunchYear: maxLaunchYear || null,
			minPrice: minPrice || null,
			maxPrice: maxPrice || null,
			description: description || null,
		});

		if (preferredStoreIDs && Array.isArray(preferredStoreIDs)) {
			for (const storeId of preferredStoreIDs) {
				await models.PreferredStoresInterets.create({
					interestId: newInterest.id,
					storeId: storeId,
				});
			}
		}

		res.status(201).json(newInterest);
	} catch (error) {
		console.error("Error creating interest:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const {
			brandID,
			modelID,
			typeID,
			equipmentSheetID,
			equipmentStatusID,
			minLaunchYear,
			maxLaunchYear,
			minPrice,
			maxPrice,
			preferredStoreIDs,
			description,
		} = req.body;

		const { id } = req.params;

		// Atualiza os dados principais
		await models.Interest.update(
			{
				brandID: brandID || null,
				modelID: modelID || null,
				typeID: typeID || null,
				equipmentSheetID: equipmentSheetID || null,
				equipmentStatusID: equipmentStatusID || null,
				minLaunchYear: minLaunchYear || null,
				maxLaunchYear: maxLaunchYear || null,
				minPrice: minPrice || null,
				maxPrice: maxPrice || null,
				description: description || null,
			},
			{ where: { id } }
		);

		// Atualiza as preferred stores (remove e insere de novo)
		await models.PreferredStoresInterets.destroy({ where: { interestId: id } });

		if (preferredStoreIDs && Array.isArray(preferredStoreIDs)) {
			for (const storeId of preferredStoreIDs) {
				await models.PreferredStoresInterets.create({
					interestId: id,
					storeId: storeId,
				});
			}
		}

		// Recolhe o interesse atualizado com todas as associações
		const updatedInterest = await models.Interest.findByPk(id, {
			attributes: [
				"id",
				"equipmentSheetID",
				"maxLaunchYear",
				"minLaunchYear",
				"minPrice",
				"maxPrice",
				"createdAt",
				"updatedAt",
				"description",
			],
			include: [
				{
					model: models.Brand,
					as: "brand",
					attributes: ["id", "name"],
				},
				{
					model: models.EquipmentModel,
					as: "model",
					attributes: ["id", "name"],
				},
				{
					model: models.EquipmentType,
					as: "type",
					attributes: ["id", "name"],
				},
				{
					model: models.EquipmentStatus,
					as: "equipmentStatus",
					attributes: ["id", "state"],
				},
				{
					model: models.PreferredStoresInterets,
					as: "preferredStores",
					include: [
						{
							model: models.Store,
							as: "store",
							attributes: ["nipc", "name", "email", "phone", "address"],
						},
					],
				},
			],
		});

		res.status(200).json(updatedInterest);
	} catch (error) {
		console.error("Error updating interest:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const interestId = req.params.id;
		const deletedInterest = await models.Interest.destroy({
			where: { id: interestId },
		});

		if (deletedInterest === 0) {
			return res.status(404).json({ error: "Interest not found" });
		}

		res.status(204).send();
	} catch (error) {
		console.error("Error deleting interest:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
