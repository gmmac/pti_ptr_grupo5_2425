const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	// try {
	const types = await models.EquipmentType.findAll();
	res.status(200).json(types);
	// } catch (error) {
	// 	res.status(500).json({ message: "Erro ao buscar os modelos." });
	// }
});
router.get("/:ID", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
