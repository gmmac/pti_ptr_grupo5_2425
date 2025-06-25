const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const purchaseCartEquipments = await models.PurchaseCartEquipment.findAll();
    res.status(200).json(purchaseCartEquipments);
  } catch (error) {
    console.error("Error fetching PurchaseCartEquipments:", error);
    res.status(500).json({ error: "Error fetching PurchaseCartEquipments." });
  }
});

router.get("/order/:ID", async (req, res) => {
  try {
    const cartId = req.params.ID;

    const purchaseCartEquipments = await models.PurchaseCartEquipment.findAll({
      where: { clientPurchaseId: cartId },
      // include: {
      // 	model: models.UsedEquipment,
      // 	attributes: ["id", "name", "brand", "model"],
      // },
    });

    // if (!purchaseCartEquipments) {
    // 	return res.status(404).json({ error: "Carrinhos não encontrados" });
    // }

    res.status(200).json(purchaseCartEquipments);
  } catch (error) {
    console.error("Error fetching PurchaseCartEquipment:", error);
    res.status(500).json({ error: "Error fetching PurchaseCartEquipment." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { clientPurchaseId, equipmentId } = req.body;

    if (!clientPurchaseId || !equipmentId) {
      return res
        .status(400)
        .json({ error: "clientPurchaseId and equipmentId are required." });
    }
    await models.sequelize.query(`
		SELECT setval(
			pg_get_serial_sequence('"PurchaseCartEquipments"', 'id'),
			(SELECT MAX(id) FROM "PurchaseCartEquipments")
		)
	`);

    // Criar o vínculo
    const newLine = await models.PurchaseCartEquipment.create({
      clientPurchaseId,
      equipmentId,
    });

    // Atualizar o UsedEquipment
    await models.UsedEquipment.update(
      { purchaseDate: new Date() },
      { where: { id: equipmentId } }
    );

    res.status(201).json(newLine);
  } catch (error) {
    console.error("Error creating PurchaseCartEquipment:", error);
    res.status(500).json({ error: "Error creating PurchaseCartEquipment." });
  }
});

router.post("/all-actual-cart", async (req, res) => {
  try {
    const { clientPurchaseId, cartId } = req.body;

    if (!clientPurchaseId || !cartId) {
      return res
        .status(400)
        .json({ error: "clientPurchaseId and cartId are required." });
    }
    await models.sequelize.query(`
			SELECT setval(
				pg_get_serial_sequence('"PurchaseCartEquipments"', 'id'),
				(SELECT MAX(id) FROM "PurchaseCartEquipments")
			)
		`);

    // Procura todos os usedEquipmentIds no carrinho
    const cartEquipments = await models.ActualCartEquipment.findAll({
      where: { cartId: cartId },
    });

    if (!cartEquipments.length) {
      return res.status(404).json({ error: "Cart is empty." });
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
      message: "Equipments add to card successfully.",
      totalItems,
    });
  } catch (error) {
    console.error("Error adding equipments to purchase", error);
    res.status(500).json({ error: "Error processing purchase." });
  }
});

router.get("/:ID", async (req, res) => {});

router.put("/:ID", async (req, res) => {});

router.delete("/:ID", async (req, res) => {
  try {
    const cartItem = await models.PurchaseCartEquipment.findByPk(req.params.ID);

    if (!cartItem) {
      return res.status(404).json({ error: "PurchaseCartEquipment not found" });
    }

    await models.UsedEquipment.update(
      { purchaseDate: null },
      { where: { id: cartItem.equipmentId } }
    );

    await cartItem.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting PurchaseCartEquipment:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
