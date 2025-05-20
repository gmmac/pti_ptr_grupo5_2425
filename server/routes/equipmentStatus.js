const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const models = require('../models');

// List with pagination, filtering, and sorting
router.get('/displayTable', async (req, res) => {
  try {
    const {
      id,
      state,
      createdAt,
      isActive = '1',
      page = 1,
      pageSize = 10,
      sortField = 'id',
      sortOrder = 'ASC'
    } = req.query;

    const where = { isActive: { [Op.like]: isActive } };

    if (id) {
      where.id = Sequelize.where(
        Sequelize.cast(Sequelize.col('EquipmentStatus.id'), 'varchar'),
        { [Op.iLike]: `${id}%` }
      );
    }
    if (state) {
      where.state = { [Op.iLike]: `%${state}%` };
    }
    if (createdAt) {
      const start = new Date(createdAt);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      where.createdAt = { [Op.gte]: start, [Op.lt]: end };
    }

    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
    const order = [[Sequelize.col(sortField), sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];

    const { count, rows } = await models.EquipmentStatus.findAndCountAll({ where, limit, offset, order });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      pageSize: limit,
      data: rows.map(r => ({ id: r.id, state: r.state, isActive: r.isActive }))
    });
  } catch (error) {
    console.error('Error fetching equipment statuses:', error);
    res.status(500).json({ message: 'Error fetching equipment statuses.' });
  }
});

// Simple list for dropdowns
router.get('/', async (req, res) => {
  try {
    const { isActive = '1' } = req.query;
    const list = await models.EquipmentStatus.findAll({ where: { isActive } });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching equipment statuses:', error);
    res.status(500).json({ message: 'Error fetching equipment statuses.' });
  }
});

// Create new status
router.post('/', async (req, res) => {
  try {
    const { state } = req.body;
    const newStatus = await models.EquipmentStatus.create({
      state,
      isActive: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(newStatus);
  } catch (error) {
    console.error('Error creating equipment status:', error);
    res.status(500).json({ message: 'Error creating equipment status.' });
  }
});

// Retrieve a status by ID
router.get('/:id', async (req, res) => {
  try {
    const status = await models.EquipmentStatus.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Equipment status not found.' });
    res.status(200).json(status);
  } catch (error) {
    console.error('Error fetching equipment status:', error);
    res.status(500).json({ message: 'Error fetching equipment status.' });
  }
});

// Update a status by ID
router.put('/:id', async (req, res) => {
  try {
    const { state } = req.body;
    const status = await models.EquipmentStatus.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Equipment status not found.' });
    await status.update({ state, updatedAt: new Date() });
    res.status(200).json(status);
  } catch (error) {
    console.error('Error updating equipment status:', error);
    res.status(500).json({ message: 'Error updating equipment status.' });
  }
});

// Toggle isActive (soft delete / restore)
router.patch('/activation/:id', async (req, res) => {
  try {
    const status = await models.EquipmentStatus.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Equipment status not found.' });
    status.isActive = status.isActive === '1' ? '0' : '1';
    await status.save();
    res.status(200).json(status);
  } catch (error) {
    console.error('Error toggling equipment status activation:', error);
    res.status(500).json({ message: 'Error toggling equipment status activation.' });
  }
});

module.exports = router;