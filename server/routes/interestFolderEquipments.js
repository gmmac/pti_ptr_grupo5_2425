const express = require("express");
const router = express.Router();
const models = require("../models");

// GET - obter todos os registos
router.get("/", async (req, res) => {
	try {
		const all = await models.FolderInterestEquipments.findAll();
		res.status(200).json(all);
	} catch (err) {
		res.status(500).json({ error: "Erro ao obter os dados." });
	}
});

// POST - adicionar um novo registo
router.post("/", async (req, res) => {
	const { folderInterestId, interestId } = req.body;

	if (!folderInterestId || !interestId) {
		return res.status(400).json({ error: "Campos obrigatórios em falta." });
	}

	try {
		const newItem = await models.FolderInterestEquipments.create({
			folderInterestId,
			interestId,
		});
		res.status(201).json(newItem);
	} catch (err) {
		res.status(500).json({ error: "Erro ao criar o registo." });
	}
});

// PUT - atualizar um registo existente por ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { folderInterestId, interestId } = req.body;

	try {
		const item = await models.FolderInterestEquipments.findByPk(id);
		if (!item) {
			return res.status(404).json({ error: "Registo não encontrado." });
		}

		item.folderInterestId = folderInterestId ?? item.folderInterestId;
		item.interestId = interestId ?? item.interestId;
		await item.save();

		res.status(200).json(item);
	} catch (err) {
		res.status(500).json({ error: "Erro ao atualizar o registo." });
	}
});

// DELETE - remover um registo específico por ID (usando query ou body)
router.delete("/", async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ error: "ID do registo em falta." });
	}

	try {
		const deleted = await models.FolderInterestEquipments.destroy({
			where: { id },
		});

		if (!deleted) {
			return res.status(404).json({ error: "Registo não encontrado." });
		}

		res.status(200).json({ message: "Registo removido com sucesso." });
	} catch (err) {
		res.status(500).json({ error: "Erro ao remover o registo." });
	}
});

module.exports = router;
