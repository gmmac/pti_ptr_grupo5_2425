const express = require("express");
const router = express.Router();
const models = require("../models");

// GET - listar todos os registos
router.get("/", async (req, res) => {
	try {
		const all = await models.PreferredStoresInterets.findAll({
			include: ["store", "interest"],
		});
		res.json(all);
	} catch (err) {
		console.error("Erro ao obter dados:", err);
		res.status(500).json({ error: "Erro ao obter dados." });
	}
});

// POST - criar novo registo
router.post("/", async (req, res) => {
	const { storeId, interestId } = req.body;

	if (!storeId || !interestId) {
		return res.status(400).json({ error: "Campos obrigatórios em falta." });
	}

	try {
		const newEntry = await models.PreferredStoresInterets.create({
			storeId,
			interestId,
		});
		res.status(201).json(newEntry);
	} catch (err) {
		console.error("Erro ao criar registo:", err);
		res.status(500).json({ error: "Erro ao criar registo." });
	}
});

// GET - obter registo por ID (ID autogerado do Sequelize)
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const item = await models.PreferredStoresInterets.findByPk(id, {
			include: ["store", "interest"],
		});
		if (!item) {
			return res.status(404).json({ error: "Registo não encontrado." });
		}
		res.json(item);
	} catch (err) {
		console.error("Erro ao obter registo:", err);
		res.status(500).json({ error: "Erro ao obter registo." });
	}
});

// PUT - atualizar registo por ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { storeId, interestId } = req.body;

	try {
		const item = await models.PreferredStoresInterets.findByPk(id);
		if (!item) {
			return res.status(404).json({ error: "Registo não encontrado." });
		}

		await item.update({ storeId, interestId });
		res.json(item);
	} catch (err) {
		console.error("Erro ao atualizar registo:", err);
		res.status(500).json({ error: "Erro ao atualizar registo." });
	}
});

// DELETE - remover registo por ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const item = await models.PreferredStoresInterets.findByPk(id);
		if (!item) {
			return res.status(404).json({ error: "Registo não encontrado." });
		}

		await item.destroy();
		res.status(204).send(); // No Content
	} catch (err) {
		console.error("Erro ao eliminar registo:", err);
		res.status(500).json({ error: "Erro ao eliminar registo." });
	}
});

module.exports = router;
