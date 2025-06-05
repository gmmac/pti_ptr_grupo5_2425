const express = require('express');
const router = express.Router();
const models = require('../models')
const { Op, Sequelize } = require('sequelize');

router.get("/", async (req, res) => {
    try {
      const { isActive = '1' } = req.query;

      const where = { isActive };    
      const employeeRoles = await models.EmployeeRole.findAll({
        where
      });
      res.json(employeeRoles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erroe fetching roles." });
    }
});
  

router.get('/displayTable', async (req, res) => {
  try {
    const {
      id,
      role,
      createdAt,
      isActive = "1",
      page = 1,
      pageSize = 5,
      sortField = 'id',
      sortOrder = 'ASC',
    } = req.query;

    // Monta o objeto de filtros
    const where = {};

    // Filtro por ID começando com o valor informado
    if (id) {
      where.id = Sequelize.where(
        Sequelize.cast(Sequelize.col('EmployeeRole.id'), 'varchar'),
        { [Op.iLike]: `${id}%` }
      );
    }

    where.isActive = { [Op.like]: isActive }

    // Filtro por texto no campo `role`
    if (role) {
      where.role = { [Op.iLike]: `%${role}%` };
    }

    // Filtro por data de criação (todas as criações no dia informado)
    if (createdAt) {
      const dayStart = new Date(createdAt);
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      where.createdAt = {
        [Op.gte]: dayStart,
        [Op.lt]: dayEnd,
      };
    }

    // Paginação
    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Ordenação dinâmica
    const orderClause = [];

    if (sortField === "state") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("EmployeeRole.role")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    // Consulta com contagem total
    const { count, rows } = await models.EmployeeRole.findAndCountAll({
      where,
      limit,
      offset,
      order: orderClause,
    });

    // Formata somente os campos que interessam
    const data = rows.map(r => ({
      id: r.id,
      role: r.role,
      protected: r.protected,
      isActive: r.isActive
    }));

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      pageSize: limit,
      data,
    });
  } catch (error) {
    console.error('Error fetching employee roles:', error);
    res.status(500).json({ message: 'Error fetching roles.' });
  }
});

router.patch('/activation/:id', async (req, res) => {
  try {
    const role = await models.EmployeeRole.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found.' });
    }
    
    role.isActive = role.isActive == 1 ? 0 : 1;
    console.log(role.isActive)

    await role.save();

    const statusText = role.isActive === 1 ? 'activated' : 'deactivated';
    res.status(200).json({
      message: `Role ${statusText} successfully.`,
      role
    });
  } catch (error) {
    console.error('Error toggling role activation:', error);
    res.status(500).json({ error: 'Error updating role activation status.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { role, isActive = '1' } = req.body;
    const newEmployeeRole = await models.EmployeeRole.create({
      role,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(newEmployeeRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating role.' });
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
