const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/", async (req, res) => {
    try {
      const employeeRoles = await models.EmployeeRole.findAll();
      res.json(employeeRoles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erroe fetching roles." });
    }
  });
  
  // Rota para criar um novo EmployeeRole
  router.post("/", async (req, res) => {
    try {
      const newEmployeeRole = await models.EmployeeRole.create({
        role:  req.body.role,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      res.status(201).json(newEmployeeRole);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating roles." });
    }
  });

router.get("/:ID", (req, res) => {

});

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
