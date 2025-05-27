const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.post("/", async (req, res) => {
    try {
        const {
            repairID,
            partID,
            quantity,
            totalPrice,
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

        const repairParts = await models.RepairParts.create({
            repairID,
            partID,
            quantity,
            totalPrice,
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
