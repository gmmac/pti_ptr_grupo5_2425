const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const purchases = await models.ClientPurchase.findAll();
		res.json(purchases);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.post("/", async (req, res) => {
	try {
		const { clientNIC, totalPrice, employeeID } = req.body;

		if (!clientNIC || !totalPrice) {
			return res
				.status(400)
				.json({ error: "clientNIC e totalPrice são obrigatórios." });
		}

		const purchase = await models.ClientPurchase.create({
			clientNIC,
			total: totalPrice,
			employeeID: employeeID ?? "123456789", // padrão
		});

		res.status(201).json({ id: purchase.id });
	} catch (error) {
		console.error("Erro ao criar compra:", error);
		res.status(400).json({ error: error.message });
	}
});

router.get("/client-orders/:ID", async (req, res) => {
	try {
		const clientId = req.params.ID;

		const cartsIds = await models.ClientPurchase.findAll({
			where: { clientNIC: clientId },
		});

		if (!cartsIds) {
			return res.status(404).json({ error: "Carrinhos não encontrados" });
		}

		res.status(200).json(cartsIds);
	} catch (error) {
		console.error("Erro ao buscar PurchaseCartEquipment:", error);
		res.status(500).json({ error: "Erro ao buscar PurchaseCartEquipment." });
	}
});

router.get("/:ID", async (req, res) => {
	try {
		const purchase = await models.ClientPurchase.findByPk(req.params.ID);
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
		const purchase = await models.ClientPurchase.findByPk(req.params.ID);
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
		const purchase = await models.ClientPurchase.findByPk(req.params.ID);
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
