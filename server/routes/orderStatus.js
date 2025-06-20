const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const orderStatuses = await models.OrderStatus.findAll();
		res.status(200).json(orderStatuses);
	} catch (error) {
		res.status(500).json({ message: "Error." });
	}
});

router.post("/", async (req, res) => {
	try {
		const orderStatus = await models.OrderStatus.create(req.body);
		res.status(201).json(orderStatus);
	} catch (error) {
		res.status(500).json({ message: "Error." });
	}
});

router.get("/:ID", async (req, res) => {
	try {
		const orderStatus = await models.OrderStatus.findByPk(req.params.ID);
		if (orderStatus) {
			res.status(200).json(orderStatus);
		} else {
			res.status(404).json({ message: "Order status not found." });
		}
	} catch (error) {
		res.status(500).json({ message: "Error." });
	}
});

router.put("/:ID", async (req, res) => {
	try {
		const orderStatus = await models.OrderStatus.findByPk(req.params.ID);
		if (orderStatus) {
			await orderStatus.update(req.body);
			res.status(200).json(orderStatus);
		} else {
			res.status(404).json({ message: "Order status not found." });
		}
	} catch (error) {
		res.status(500).json({ message: "Error." });
	}
});

router.delete("/:ID", async (req, res) => {
	try {
		const orderStatus = await models.OrderStatus.findByPk(req.params.ID);
		if (orderStatus) {
			await orderStatus.destroy();
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Order status not found." });
		}
	} catch (error) {
		res.status(500).json({ message: "Error." });
	}
});
module.exports = router;
