const express = require('express');
const router = express.Router();
const models = require('../models')

router.get("/:repairId", async (req, res) => {
    try {
        const { page = 1, pageSize = 5, orderBy, orderDirection} = req.query;
        const repairId = req.params.repairId;
        const offset = (parseInt(page) - 1) * parseInt(pageSize);

        let order = [];

        if (orderBy && orderDirection) {
            order = [[orderBy, orderDirection.toUpperCase()]];
        } else {
            order = [["id", "ASC"]];
        }

        const { count, rows } = await models.RepairStatusLog.findAndCountAll({
        where: {
            repairId: repairId,
        },
        include: [
            {
                model: models.RepairStatus,
                attributes: ["id", "state"],
            },
        ],

        limit: parseInt(pageSize),
        offset,
        order,
        distinct: true,
    });
    res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        data: rows,
    });
    } catch (error) {
        res.status(500).json({ error: "Error fetching repairs." });
    }
});

module.exports = router;