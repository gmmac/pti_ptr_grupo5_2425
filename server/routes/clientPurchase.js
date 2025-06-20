const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const purchases = await models.ClientPurchase.findAll();
		res.status(200).json(purchases);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const {
			clientNIC,
			totalPrice,
			employeeID,
			pickupInStore,
			address,
			storeId,
		} = req.body;

		if (!clientNIC || totalPrice === undefined || totalPrice === null) {
			return res
				.status(400)
				.json({ error: "clientNIC and totalPrice are Required." });
		}

		const purchase = await models.ClientPurchase.create({
			clientNIC,
			total: totalPrice,
			employeeID: employeeID ?? "000000000", // onlineEmployee
			orderStatusID: 1, // padrão - pendding approval
			pickupInStore,
			address: address ?? "",
			storeId: storeId ?? "000000000",
		});

		res.status(201).json({ id: purchase.id });
	} catch (error) {
		console.error("Error creating Purchase:", error);
		res.status(400).json({ error: error.message });
	}
});

router.get("/client-orders/:ID", async (req, res) => {
	try {
		const clientId = req.params.ID;

		const cartsIds = await models.ClientPurchase.findAll({
			where: { clientNIC: clientId },
			include: {
				model: models.OrderStatus,
				attributes: ["state"],
			},
		});

		if (!cartsIds) {
			return res.status(404).json({ error: "Carts not found" });
		}

		res.status(200).json(cartsIds);
	} catch (error) {
		console.error("Error fetching PurchaseCartEquipment:", error);
		res.status(500).json({ error: "Error fetching PurchaseCartEquipment." });
	}
});

router.get("/:ID", async (req, res) => {
	try {
		const purchase = await models.ClientPurchase.findByPk(req.params.ID);
		if (!purchase) {
			return res.status(404).json({ error: "Purchase not found" });
		}
		res.status(200).json(purchase);
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
		res.status(200).json(purchase);
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
