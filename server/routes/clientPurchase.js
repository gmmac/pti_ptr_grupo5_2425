const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const purchases = await ClientPurchase.findAll();
		res.json(purchases);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const purchase = await ClientPurchase.create(req.body);
		res.status(201).json(purchase);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get("/:ID", async (req, res) => {
	try {
		const purchase = await ClientPurchase.findByPk(req.params.ID);
		if (!purchase) {
			return res.status(404).json({ error: "Purchase not found" });
		}
		res.json(purchase);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:ID", async (req, res) => {
	try {
		const purchase = await ClientPurchase.findByPk(req.params.ID);
		if (!purchase) {
			return res.status(404).json({ error: "Purchase not found" });
		}
		await purchase.update(req.body);
		res.json(purchase);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:ID", async (req, res) => {
	try {
		const purchase = await ClientPurchase.findByPk(req.params.ID);
		if (!purchase) {
			return res.status(404).json({ error: "Purchase not found" });
		}
		await purchase.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
