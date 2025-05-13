const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const purchaseCartEquipments = await models.PurchaseCartEquipment.findAll();
		res.status(200).json(purchaseCartEquipments);
	} catch (error) {
		console.error("Erro ao buscar PurchaseCartEquipments:", error);
		res.status(500).json({ error: "Erro ao buscar PurchaseCartEquipments." });
	}
});

router.post("/", async (req, res) => {});

router.post("/all-actual-cart", async (req, res) => {
	try {
		const { clientPurchaseId, cartId } = req.body;

		if (!clientPurchaseId || !cartId) {
			return res
				.status(400)
				.json({ error: "clientPurchaseId e cartId são obrigatórios." });
		}

		// Procura todos os usedEquipmentIds no carrinho
		const cartEquipments = await models.ActualCartEquipment.findAll({
			where: { cartId: cartId },
		});

		if (!cartEquipments.length) {
			return res
				.status(404)
				.json({ error: "Nenhum equipamento encontrado no carrinho." });
		}

		let totalItems = 0;

		// Loop para criar cada item individualmente e atualizar UsedEquipment
		for (const item of cartEquipments) {
			const equipmentId = item.equipmentId;

			// Criar uma entrada em PurchaseCartEquipment
			await models.PurchaseCartEquipment.create({
				clientPurchaseId,
				equipmentId,
			});

			// Atualizar a data de compra no equipamento usado
			await models.UsedEquipment.update(
				{ purchaseDate: new Date() },
				{ where: { id: equipmentId } }
			);

			totalItems++;
		}

		res.status(201).json({
			message: "Equipamentos adicionados à compra com sucesso.",
			totalItems,
		});
	} catch (error) {
		console.error("Erro ao adicionar equipamentos da compra:", error);
		res.status(500).json({ error: "Erro ao processar a compra." });
	}
});

router.get("/:ID", async (req, res) => {});

router.put("/:ID", async (req, res) => {});

router.delete("/:ID", async (req, res) => {});

module.exports = router;
