const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", (req, res) => {

});

router.post("/", (req, res) => {

});


//EXEMPLO DE ROTA PARA À PARTIR DAS WAREHOUSES TER ACESSO AOS SEUS USED_EQUIPMENTS
router.get("/:ID", async (req, res) => {
  const warehouse = await models.Warehouse.findByPk(req.params.ID, {
    include: {
      model: models.CharityProject,
      include: {
        model: models.UsedEquipment
      }
    }
  });
  
  res.json(warehouse);
});

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
