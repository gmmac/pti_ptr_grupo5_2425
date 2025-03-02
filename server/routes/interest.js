const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", async (req, res) => {
    try {
      const interests = await models.Interest.findAll();
      res.status(200).json(interests);
    } catch (error) {
      res.status(500).json({ message: 'Error.', error });
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
