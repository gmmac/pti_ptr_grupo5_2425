const express = require("express");
const router = express.Router();
const models = require("../models");

// Get all ActualCartEquipments
router.get("/", async (req, res) => {
	try {
		const actualCartEquipments = await models.ActualCartEquipment.findAll();
		res.json(actualCartEquipments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Create a new ActualCartEquipment
router.post("/", async (req, res) => {
	try {
		const newCartEquipment = await models.ActualCartEquipment.create(req.body);
		res.status(201).json(newCartEquipment);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Get a specific ActualCartEquipment by Cart ID
router.get("/:cartId", async (req, res) => {
	// try {
	const cartEquipment = await models.ActualCartEquipment.findAll({
		where: { cartId: req.params.cartId },
	});

	if (!cartEquipment.length)
		return res.status(404).json({ error: "ActualCartEquipment not found" });

	const equipmentDetails = await Promise.all(
		cartEquipment.map(async (item) => {
			const usedEquipment = await models.UsedEquipment.findOne({
				where: { id: item.equipmentId },
			});
			if (!usedEquipment) return null;

			const status = await models.EquipmentStatus.findOne({
				where: { id: usedEquipment.statusID },
			});
			const equipmentSheet = await models.EquipmentSheet.findOne({
				where: { barcode: usedEquipment.equipmentId },
			});

			const model = equipmentSheet
				? await models.EquipmentModel.findOne({
						where: { id: equipmentSheet.model },
				  })
				: null;
			return {
				...usedEquipment.get(),
				statusName: status ? status.state : null,
				modelName: model ? model.name : null,
			};
		})
	);

	res.json(equipmentDetails.filter((e) => e !== null));
	// } catch (error) {
	// 	res.status(500).json({ error: error.message });
	// }
});

// Update an ActualCartEquipment by ID
router.put("/:id", async (req, res) => {
	try {
		const [updated] = await models.ActualCartEquipment.update(req.body, {
			where: { id: req.params.id },
		});
		if (!updated)
			return res.status(404).json({ error: "ActualCartEquipment not found" });
		res.json({ message: "ActualCartEquipment updated successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Delete an ActualCartEquipment by ID
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await models.ActualCartEquipment.destroy({
			where: { id: req.params.id },
		});
		if (!deleted)
			return res.status(404).json({ error: "ActualCartEquipment not found" });
		res.json({ message: "ActualCartEquipment deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
