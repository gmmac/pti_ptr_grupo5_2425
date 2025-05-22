const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op, Sequelize } = require('sequelize');

// List (table view) with filters, pagination, sorting
router.get('/displayTable', async (req, res) => {
  try {
    const {
      id,
      state,
      createdAt,
      isActive = '1',
      page = 1,
      pageSize = 5,
      sortField = 'id',
      sortOrder = 'ASC'
    } = req.query;

    const where = { isActive: { [Op.like]: isActive } };

    if (id) {
      where.id = Sequelize.where(
        Sequelize.cast(Sequelize.col('RepairStatus.id'), 'varchar'),
        { [Op.iLike]: `${id}%` }
      );
    }
    if (state) {
      where.state = { [Op.iLike]: `%${state}%` };
    }
    if (createdAt) {
      const start = new Date(createdAt);
      const end = new Date(start.getTime() + 24*60*60*1000);
      where.createdAt = { [Op.gte]: start, [Op.lt]: end };
    }

    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
    const order = [];

    if (sortField === "state") {
      order.push([
        Sequelize.fn("LOWER", Sequelize.col("RepairStatus.state")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      order.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const { count, rows } = await models.RepairStatus.findAndCountAll({
      where,
      limit,
      offset,
      order
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      pageSize: limit,
      data: rows.map(r => ({
        id: r.id,
        state: r.state,
        isActive: r.isActive
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching repair statuses.' });
  }
});

// Simple list (for dropdowns, etc.)
router.get('/', async (req, res) => {
  try {
    const { isActive = '1' } = req.query;
    const list = await models.RepairStatus.findAll({ where: { isActive } });
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching repair statuses.' });
  }
});

// Create
router.post('/', async (req, res) => {
  try {
    const { state } = req.body;
    const newStatus = await models.RepairStatus.create({
      state,
      isActive: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(newStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating repair status.' });
  }
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const status = await models.RepairStatus.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Not found.' });
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching repair status.' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const { state } = req.body;
    const status = await models.RepairStatus.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Not found.' });
    await status.update({ state, updatedAt: new Date() });
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating repair status.' });
  }
});

// Toggle isActive (soft delete / restore)
router.patch('/activation/:id', async (req, res) => {
  try {
    const status = await models.RepairStatus.findByPk(req.params.id);
    if (!status) return res.status(404).json({ message: 'Not found.' });
    status.isActive = status.isActive === '1' ? '0' : '1';
    await status.save();
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error toggling activation.' });
  }
});

module.exports = router;