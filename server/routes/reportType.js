// src/routes/reportType.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const models = require('../models');

// GET list of report types (for dropdowns)
router.get('/', async (req, res) => {
  try {
    const { isActive = '1' } = req.query;
    const list = await models.ReportType.findAll({
      where: { isActive },
      order: [['name', 'ASC']]
    });
    // return only name values
    res.status(200).json(list.map(rt => rt.name));
  } catch (error) {
    console.error('Error fetching report types:', error);
    res.status(500).json({ message: 'Error fetching report types.' });
  }
});

// GET paginated, filterable list of report types
router.get('/displayTable', async (req, res) => {
  try {
    const {
      name,
      isActive = '1',
      page = 1,
      pageSize = 5,
      sortField = 'id',
      sortOrder = 'ASC'
    } = req.query;

    const where = { isActive };
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    const order = [[sortField, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];

    const { count, rows } = await models.ReportType.findAndCountAll({
      attributes: ["id", "name"],
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
      data: rows
    });
  } catch (error) {
    console.error('Error fetching report types list:', error);
    res.status(500).json({ message: 'Error fetching report types list.' });
  }
});

// CREATE a new report type
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newType = await models.ReportType.create({
      name,
      isActive: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(newType);
  } catch (error) {
    console.error('Error creating report type:', error);
    res.status(500).json({ message: 'Error creating report type.' });
  }
});

// GET a specific report type by ID
router.get('/:id', async (req, res) => {
  try {
    const type = await models.ReportType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Report type not found.' });
    res.status(200).json(type);
  } catch (error) {
    console.error('Error fetching report type:', error);
    res.status(500).json({ message: 'Error fetching report type.' });
  }
});

// UPDATE report type
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const type = await models.ReportType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Report type not found.' });
    await type.update({ name, updatedAt: new Date() });
    res.status(200).json(type);
  } catch (error) {
    console.error('Error updating report type:', error);
    res.status(500).json({ message: 'Error updating report type.' });
  }
});

// TOGGLE activation (soft delete/restore)
router.patch('/activation/:id', async (req, res) => {
  try {
    const type = await models.ReportType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Report type not found.' });
    type.isActive = type.isActive === '1' ? '0' : '1';
    await type.save();
    res.status(200).json(type);
  } catch (error) {
    console.error('Error toggling report type activation:', error);
    res.status(500).json({ message: 'Error toggling report type activation.' });
  }
});

module.exports = router;
