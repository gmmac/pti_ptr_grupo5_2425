const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {});

router.post("/all-actual-cart", async (req, res) => {
	try {
		const { clientPurchaseId, cartId } = req.body;

		if (!clientPurchaseId || !cartId) {
			return res
				.status(400)
				.json({ error: "clientPurchaseId e cartId são obrigatórios." });
		}
		console.log("cartId:", cartId);

		// Procura todos os usedEquipmentIds no carrinho
		const cartEquipments = await models.ActualCartEquipment.findAll({
			where: { cartId: cartId },
		});
		console.log(cartEquipments);
		if (!cartEquipments.length) {
			return res
				.status(404)
				.json({ error: "Nenhum equipamento encontrado no carrinho." });
		}

		// Prepara os dados para inserção
		const purchaseEquipments = cartEquipments.map((item) => ({
			clientPurchaseId,
			equipmentId: item.equipmentId,
		}));
		console.log(purchaseEquipments);

		// Cria todas as entradas em ClientPurchaseEquipment

		await models.PurchaseCartEquipment.bulkCreate(purchaseEquipments);

		res.status(201).json({
			message: "Equipamentos adicionados à compra com sucesso.",
			totalItems: purchaseEquipments.length,
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
