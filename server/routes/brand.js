const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
		const brands = await models.Brand.findAll();
		res.status(200).json(brands);
	} catch (error) {
		res.status(500).json({ message: "Error fetching brands." });
	}
});

router.post("/", (req, res) => {});

router.get("/:ID", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
