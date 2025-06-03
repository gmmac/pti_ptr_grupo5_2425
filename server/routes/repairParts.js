const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/:repairID", async (req, res) => {
    const { repairID } = req.params;
	try {
		const repairParts = await models.RepairParts.findAll({
			where: { repairID: repairID },

            include: [
				{
					model: models.Part,
					attributes: ["name"],
				},
			],
		});

		if (repairParts) {
			res.status(200).json({ parts: repairParts });
		} else {
			res.status(404).json({ error: "No parts found for this repair." });
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Error retrieving parts associated with repair." });
	}
});


router.post("/", async (req, res) => {
    try {
        const {
            repairID,
            partID,
            quantity,
            totalPrice,
            arrivalDate,
        } = req.body;

        if (!repairID) {
            return res.status(400).json({ error: "Repair ID is required." });
        }

        if (!partID) {
            return res.status(400).json({ error: "Part ID is required." });
        }

        if (!quantity) {
            return res.status(400).json({ error: "Quantity is required." });
        }

        if (!totalPrice) {
            return res.status(400).json({ error: "Total is required." });
        }

        if (!arrivalDate) {
            return res.status(400).json({ error: "Arrival date is required." });
        }

        const repairParts = await models.RepairParts.create({
            repairID,
            partID,
            quantity,
            totalPrice,
            arrivalDate,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(200).json({
            data: repairParts,
        });
    } catch (error) {
    res.status(500).json({ error: "Error creating repair." });
    }
});

module.exports = router;
