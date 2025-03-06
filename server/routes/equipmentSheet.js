const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", async (req, res) => {
    try {
        const equipmentSheet = await models.EquipmentSheet.findAll();
        res.status(200).json(equipmentSheet);
    } catch (error) {
        res.status(500).json({ message: 'Error.' });
    }
});

router.post("/", (req, res) => {

});

router.get("/:ID", (req, res) => {

});

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {

});

router.get("/:ID/part", (req, res) => {
    
});


module.exports = router;
