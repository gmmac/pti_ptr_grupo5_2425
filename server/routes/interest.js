const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", async (req, res) => {
  try {
    const { equipmentSheetID, folderInterestID, page = 1, pageSize = 5, orderBy = "createdAt", orderDirection = "DESC" } = req.query;

    const where = {}; // Filtros da tabela Interest

    if (folderInterestID) {
      where.folderInterestID = folderInterestID;
    }

    const equipmentCondition = equipmentSheetID ? { barcode: equipmentSheetID } : {};

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const { count, rows } = await models.Interest.findAndCountAll({
      where, // Aplica os filtros
      attributes: {
        exclude: ['equipmentSheetID', 'folderInterestID'],
      },
      include: [
        {
          model: models.EquipmentSheet,
          as: "equipmentSheet",
          where: equipmentCondition,
          include: [
            {
              model: models.EquipmentModel,
              attributes: ["id", "name"],
              include: [
                {
                  model: models.Brand,
                  attributes: ["id", "name"],
                }
              ]
            },
            {
              model: models.EquipmentType,
              attributes: ["id", "name"],
            }
          ],
          attributes: {
            exclude: ['model', 'type'],
          },
        },
        {
          model: models.FolderInterest,
          as: "folderInterest",
        }
      ],
      limit: parseInt(pageSize),
      offset: offset,
      order: [[orderBy, orderDirection]],
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: rows,
    });

  } catch (error) {
    console.error("Error fetching interests:", error);
    res.status(500).json({ error: "Error fetching interests." });
  }
});


  
router.post("/", async (req, res) => {

    try {
        const { 
            equipmentSheetID, 
            folderInterestID 
        } = req.body;

        if (!equipmentSheetID || !folderInterestID) {
            return res.status(400).json({ error: 'equipmentSheetID and folderInterestID are required' });
          }
      
          const newInterest = await models.Interests.create({
            equipmentSheetID,
            folderInterestID,
            createdAt: new Date(),
            updatedAt: new Date()
          });
      
          res.status(201).json(newInterest);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
});

router.get('/:id', async (req, res) => {
    try {
      const interest = await models.Interests.findByPk(req.params.id);
      if (!interest) {
        return res.status(404).json({ error: 'Interest not found' });
      }
      res.json(interest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  router.put('/:id', async (req, res) => {
    try {
        const { 
            equipmentSheetID, 
            folderInterestID 
        } = req.body;

        const interest = await models.Interests.findByPk(req.params.id);
        if (!interest) {
            return res.status(404).json({ error: 'Interest not found' });
        }
        await interest.update({ equipmentSheetID, folderInterestID, updatedAt: new Date() });
        res.json(interest);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const interest = await models.Interests.findByPk(req.params.id);
      if (!interest) {
        return res.status(404).json({ error: 'Interest not found' });
      }
      await interest.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
