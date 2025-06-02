const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {});

router.get("/:userNic", async (req, res) => {
	try {
		const userNic = req.params.userNic;
		const interestFolders = await models.FolderInterest.findAll({
			where: {
				clientNIC: userNic,
			},
		});
		res.json(interestFolders);
	} catch (error) {
		console.error("Error fetching interest folders:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, clientNIC } = req.body;
		const newFolder = await models.FolderInterest.create({
			name,
			clientNIC,
		});
		res.status(201).json(newFolder);
	} catch (error) {
		console.error("Error creating interest folder:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

module.exports = router;
