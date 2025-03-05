const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/:NIC", async (req, res) => {
	try {
		const client = await Client.findByPk(req.params.NIC);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}
		res.json(client);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:NIC", async (req, res) => {
	try {
		const client = await Client.findByPk(req.params.NIC);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}
		await client.update(req.body);
		res.json(client);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:NIC", async (req, res) => {
	try {
		const client = await Client.findByPk(req.params.NIC);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}
		await client.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const client = await Client.create(req.body);
		res.status(201).json(client);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
