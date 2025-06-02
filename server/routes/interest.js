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

router.get("/:userNic/:folderId", async (req, res) => {
	try {
		const { userNic, folderId } = req.params;

		if (folderId === "null") {
			const allInterests = await models.Interest.findAll({
				where: {
					clientNic: userNic,
				},
				attributes: [
					"id",
					"equipmentSheetID",
					"maxLaunchYear",
					"minLaunchYear",
					"minPrice",
					"maxPrice",
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
				],
			});
			res.json(allInterests);
		} else {
			const interestsIds = await models.FolderInterestEquipments.findAll({
				where: {
					clientNic: userNic,
					folderId: folderId,
				},
			});
			const interests = {};
			for (const interest of interestsIds) {
				const interestData = await models.Interest.findOne({
					where: {
						id: interest.interestId,
					},
					attributes: [
						"id",
						"equipmentSheetID",
						"maxLaunchYear",
						"minLaunchYear",
						"minPrice",
						"maxPrice",
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
					],
				});
				if (interestData) {
					interests[interestData.id] = interestData;
				}
			}
			res.json(interests);
		}
	} catch (error) {
		console.error("Error fetching interests:", error);
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
		});

		if (preferredStoreIDs && Array.isArray(preferredStoreIDs)) {
			for (const storeId of preferredStoreIDs) {
				try {
					await models.PreferredStoresInterets.create({
						interestId: newInterest.id,
						storeId: storeId,
					});
				} catch (error) {
					console.error("Error associating store to interest:", error);
					res
						.status(500)
						.json({ error: "Failed to associate store with interest" });
					return;
				}
			}
		}

		res.status(201).json(newInterest);
	} catch (error) {
		console.error("Error creating interest:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.put("/:id", async (req, res) => {});

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
