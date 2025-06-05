const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

// GET /api/warehouses/displayTable
router.get('/displayTable', async (req, res) => {
  try {
    const {
      id,
      name,
      totalSlots,
      availableSlots,
      isActive = '1',
      page = 1,
      pageSize = 5,
      sortField = 'id',
      sortOrder = 'ASC'
    } = req.query;

    const where = { isActive: { [Op.like]: isActive } };
    if (id) {
      where.id = Sequelize.where(
        Sequelize.cast(Sequelize.col('Warehouse.id'), 'varchar'),
        { [Op.iLike]: `${id}%` }
      );
    }
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (totalSlots) where.totalSlots = parseInt(totalSlots, 10);
    if (availableSlots) where.availableSlots = parseInt(availableSlots, 10);

    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
    const order = [[Sequelize.col(sortField), sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];

    const { count, rows } = await models.Warehouse.findAndCountAll({ where, limit, offset, order });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      pageSize: limit,
      data: rows.map(w => ({
        id: w.id,
        name: w.name,
        totalSlots: w.totalSlots,
        availableSlots: w.availableSlots,
        isActive: w.isActive
      }))
    });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ message: 'Error fetching warehouses.' });
  }
});

// GET /api/warehouses
router.get('/', async (req, res) => {
  try {
    const { isActive = '1' } = req.query;
    const list = await models.Warehouse.findAll({ where: { isActive } });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching warehouses list:', error);
    res.status(500).json({ message: 'Error fetching warehouses.' });
  }
});

// POST /api/warehouses
router.post('/', async (req, res) => {
  try {
    const { name, totalSlots, availableSlots } = req.body;
    // Validation: availableSlots must not exceed totalSlots
    if (availableSlots > totalSlots) {
      return res.status(400).json({ message: 'Available slots cannot exceed total slots.' });
    }
    const newWarehouse = await models.Warehouse.create({
      name,
      totalSlots,
      availableSlots,
      isActive: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error('Error creating warehouse:', error);
    res.status(500).json({ message: 'Error creating warehouse.' });
  }
});

// GET /api/warehouses/:id
router.get('/:id', async (req, res) => {
  try {
    const warehouse = await models.Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found.' });
    res.status(200).json(warehouse);
  } catch (error) {
    console.error('Error fetching warehouse:', error);
    res.status(500).json({ message: 'Error fetching warehouse.' });
  }
});

// PUT /api/warehouses/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, totalSlots, availableSlots } = req.body;
    const warehouse = await models.Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found.' });

    // Determine new values
    const newTotal = totalSlots != null ? totalSlots : warehouse.totalSlots;
    const newAvailable = availableSlots != null ? availableSlots : warehouse.availableSlots;
    // Validation: availableSlots must not exceed totalSlots
    if (newAvailable > newTotal) {
      return res.status(400).json({ message: 'Available slots cannot exceed total slots.' });
    }

    await warehouse.update({
      name: name ?? warehouse.name,
      totalSlots: newTotal,
      availableSlots: newAvailable,
      updatedAt: new Date()
    });
    res.status(200).json(warehouse);
  } catch (error) {
    console.error('Error updating warehouse:', error);
    res.status(500).json({ message: 'Error updating warehouse.' });
  }
});

// PATCH /api/warehouses/activation/:id
router.patch('/activation/:id', async (req, res) => {
  try {
    const warehouse = await models.Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found.' });
    warehouse.isActive = warehouse.isActive === '1' ? '0' : '1';
    await warehouse.save();
    res.status(200).json(warehouse);
  } catch (error) {
    console.error('Error toggling warehouse activation:', error);
    res.status(500).json({ message: 'Error toggling warehouse activation.' });
  }
});

module.exports = router;