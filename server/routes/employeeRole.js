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
  

router.put("/:ID", async (req, res) => {
  try {
      const { ID } = req.params;
      const { role } = req.body;

      const employeeRole = await models.EmployeeRole.findByPk(ID);
      if (!employeeRole) {
          return res.status(404).json({ message: "Role not found." });
      }

      await employeeRole.update({
          role,
          updatedAt: new Date()
      });

      res.json({ message: "Role updated successfully.", role: employeeRole });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating role." });
  }
});

router.delete("/:ID", async (req, res) => {
  try {
    const { ID } = req.params;

    // Verifica se existe algum funcionário com esse cargo
    const employeesWithRole = await models.Employee.count({ where: { role: ID } });

    if (employeesWithRole > 0) {
      return res.status(400).json({ 
        message: "Cannot delete role. There are employees assigned to this role." 
      });
    }

    // Busca e tenta excluir
    const employeeRole = await models.EmployeeRole.findByPk(ID);
    if (!employeeRole) {
      return res.status(404).json({ message: "Role not found." });
    }

    await employeeRole.destroy();
    res.json({ message: "Role deleted successfully." });

  } catch (error) {

    // Tratamento específico para erro de proteção
    if (error.message.includes("protected")) {
      return res.status(403).json({ message: "This role is protected and cannot be deleted." });
    }

    res.status(500).json({ message: "Error deleting role." });
  }
});



module.exports = router;
