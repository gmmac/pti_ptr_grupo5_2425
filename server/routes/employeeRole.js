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

  router.get("/:ID", async (req, res) => {
    try {
      const { ID } = req.params;
      const employeeRole = await models.EmployeeRole.findByPk(ID);
  
      if (!employeeRole) {
        return res.status(404).json({ message: "Role not found." });
      }
  
      res.json(employeeRole);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching role." });
    }
  });
  

router.put("/:ID", (req, res) => {

});

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
