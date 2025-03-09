const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const stores = await models.Store.findAll();
		res.json(stores);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const store = await models.Store.create(req.body);
		res.status(201).json(store);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get("/:NIPC", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		res.json(store);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:NIPC", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		await store.update(req.body);
		res.json(store);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:NIPC", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		await store.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/:NIPC/employees", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		const employees = await models.Employee.findAll({
			where: { storeNIPC: req.params.NIPC },
		});
		res.json(employees);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
