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

router.put("/:id", async (req, res) => {
	try {
		const folderId = req.params.id;
		const { name } = req.body;

		const updatedFolder = await models.FolderInterest.update(
			{ name },
			{
				where: { id: folderId },
				returning: true,
			}
		);
		if (updatedFolder[0] === 0) {
			return res.status(404).json({ error: "Folder not found" });
		}
		res.json(updatedFolder[1][0]);
	} catch (error) {
		console.error("Error updating interest folder:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const folderId = req.params.id;
		console.log("Deleting folder with ID:", folderId);

		const deletedFolder = await models.FolderInterest.destroy({
			where: { id: folderId },
		});
		if (deletedFolder === 0) {
			return res.status(404).json({ error: "Folder not found" });
		}
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting interest folder:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
