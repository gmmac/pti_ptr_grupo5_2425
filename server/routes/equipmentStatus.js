const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", async (req, res) => {
  try {
    const equipmentStatuses = await models.EquipmentStatus.findAll();
    res.status(200).json(equipmentStatuses);
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


module.exports = router;
