const express = require("express");
const router = express.Router();
const models = require("../models");

// GET all notifications
router.get("/", async (req, res) => {
	try {
		const notifications = await models.InterestNotification.findAll();
		res.json(notifications);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET notification by ID
router.get("/:id", async (req, res) => {
	try {
		const notification = await models.InterestNotification.findByPk(
			req.params.id
		);
		if (!notification)
			return res.status(404).json({ error: "Notificação não encontrada" });
		res.json(notification);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET notifications by client NIC
router.get("/byClient/:nic", async (req, res) => {
	try {
		const notifications = await models.InterestNotification.findAll({
			where: { clientNic: req.params.nic },
			include: [
				{
					model: models.Interest,
					as: "interest",
					include: [
						{ model: models.Brand, as: "brand", attributes: ["name"] },
						{
							model: models.EquipmentModel,
							as: "model",
							attributes: ["name"],
						},
						{
							model: models.EquipmentType,
							as: "type",
							attributes: ["name"],
						},
						{
							model: models.EquipmentStatus,
							as: "equipmentStatus",
							attributes: ["state"],
						},
						{
							model: models.PreferredStoresInterets,
							as: "preferredStores",
							include: [
								{
									model: models.Store,
									as: "store",
									attributes: ["name"],
								},
							],
						},
					],
				},
			],
		});
		res.json(notifications);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
// POST new notification
router.post("/", async (req, res) => {
	try {
		const { clientNic, interestId } = req.body;

		await models.sequelize.query(`
					SELECT setval(
						pg_get_serial_sequence('"InterestNotification"', 'id'),
						(SELECT MAX(id) FROM "InterestNotification")
					)
				`);
		const newNotification = await models.InterestNotification.create({
			clientNic,
			interestId,
		});
		res.status(201).json(newNotification);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// PUT update notification (mark as read or other updates)
router.put("/:id", async (req, res) => {
	try {
		const { isRead } = req.body;
		const updated = await models.InterestNotification.update(
			{ isRead },
			{ where: { id: req.params.id } }
		);
		res.json({ message: "Notificação atualizada", updated });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// DELETE notification
router.delete("/:id", async (req, res) => {
	try {
		await models.InterestNotification.destroy({ where: { id: req.params.id } });
		res.json({ message: "Notificação apagada" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
