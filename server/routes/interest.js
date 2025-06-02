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

		if (folderId === "undefined") {
			const allInterests = await models.Interest.findAll({
				where: {
					clientNIC: userNic,
				},
			});
			res.json(allInterests);
		} else {
			const interestsIds = await models.FolderInterestEquipments.findAll({
				where: {
					clientNIC: userNic,
					folderId: folderId,
				},
			});
			const interests = {};
			for (const interest of interestsIds) {
				const interestData = await models.Interest.findOne({
					where: {
						id: interest.interestId,
					},
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

router.delete("/:id", async (req, res) => {});

module.exports = router;
