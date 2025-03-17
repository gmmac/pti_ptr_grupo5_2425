const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", async (req, res) => {
    try {
        const equipmentModels = await models.EquipmentModel.findAll();
        res.status(200).json(equipmentModels);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os modelos.' });
    }
});

router.post("/", (req, res) => {

});

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
