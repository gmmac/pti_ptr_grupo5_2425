const express = require("express");
const router = express.Router();
const models = require("../models");

// Get all ActualCarts
router.get("/", async (req, res) => {
	try {
		const actualCarts = await models.ActualCart.findAll();
		res.json(actualCarts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Create a new ActualCart
router.post("/", async (req, res) => {
	try {
		const newCart = await models.ActualCart.create(req.body);
		res.status(201).json(newCart);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Get a specific ActualCart by ID
router.get("/:id", async (req, res) => {
	try {
		const cart = await models.ActualCart.findByPk(req.params.id);
		if (!cart) return res.status(404).json({ error: "ActualCart not found" });
		res.json(cart);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get a specific ActualCart by ClientNIC
router.get("/clientCartID/:clientNic", async (req, res) => {
	try {
		const cart = await models.ActualCart.findOne({
			where: { clientNIC: req.params.clientNic },
		});

		if (!cart) return res.status(404).json({ error: "ActualCart not found" });
		res.json(cart.id);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Update an ActualCart by ID
router.put("/:id", async (req, res) => {
	try {
		const [updated] = await models.ActualCart.update(req.body, {
			where: { id: req.params.id },
		});
		if (!updated)
			return res.status(404).json({ error: "ActualCart not found" });
		res.json({ message: "ActualCart updated successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Delete an ActualCart by ID
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await models.ActualCart.destroy({
			where: { id: req.params.id },
		});
		if (!deleted)
			return res.status(404).json({ error: "ActualCart not found" });
		res.json({ message: "ActualCart deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
