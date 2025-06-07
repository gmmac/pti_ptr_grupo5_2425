const express = require('express');
const router = express.Router();
const models = require('../models')

const { Op, Sequelize, fn, col, where, literal } = require("sequelize");


router.get('/sales', async (req, res, next) => {
  try {
    //
    // 1) Unsold equipment count & total sales € per store
    const unsoldEquipments = await models.Store.findAll({
    attributes: [
        'nipc',
        'name',
        [ fn('COUNT', col('usedEquipments.id')), 'unsoldCount' ]
    ],
    include: [{
        model: models.UsedEquipment,
        as: 'usedEquipments',
        attributes: [],
        where: {
        purchaseDate: null,
        putOnSaleDate: { [Op.not]: null }
        },
        // required: false 
    }],
    group: ['Store.nipc', 'Store.name'],
    raw: true
    });

    const totalSalesPerStore = await models.Store.findAll({
    attributes: [
        'nipc',
        'name',
        [ fn('SUM', col('Employees.ClientPurchases.total')),
        'totalSales' ]
    ],
    include: [{
        model: models.Employee,
        attributes: [],
        include: [{
        model: models.ClientPurchase,
        attributes: [],
        }]
    }],
    group: ['Store.nipc','Store.name'],
    having: where(
        fn('SUM', col('Employees.ClientPurchases.total')),
        '>',
        0
    ),
    raw: true
    });


    const soldEquipmentsPerStore = await models.Store.findAll({
    attributes: [
        'nipc',
        'name',
        [ fn('COUNT', col('Employees.ClientPurchases.PurchaseCartEquipments.id')),
        'equipmentsCount' ]
    ],
    include: [{
        model: models.Employee,
        attributes: [],
        include: [{
        model: models.ClientPurchase,
        attributes: [],
        include: [{
            model: models.PurchaseCartEquipment,
            attributes: []
        }]
        }]
    }],
    group: ['Store.nipc','Store.name'],
    having: where(
        fn('COUNT', col('Employees.ClientPurchases.PurchaseCartEquipments.id')),
        '>',
        0
    ),
    raw: true
    });



    return res.json({
        salesByStore: totalSalesPerStore,
        numSoldEquipmentsByStore: soldEquipmentsPerStore,
        unsoldEquipments: unsoldEquipments,
    })

  } catch (err) {
    return next(err);
  }
});


router.get('/repairs', async (req, res, next) => {
  try {

    const repairsByStore = await models.Repair.findAll({
        attributes: [
            [ Sequelize.col('UsedEquipment.storeId'),    "NIPC"    ],
            [ Sequelize.col('UsedEquipment.Store.name'), 'storeName' ],
            [ Sequelize.fn('COUNT', Sequelize.col('Repair.id')), 'repairCount' ]
        ],
        include: [{
            model: models.UsedEquipment,
            attributes: [],
            include: [{
            model: models.Store,
            attributes: []
            }]
        }],
        group: [
            'UsedEquipment.storeId',
            'UsedEquipment.Store.name'
        ],
        raw: true
    });

    const repairsByEquipmentSheet = await models.Repair.findAll({
        attributes: [
            [ Sequelize.col('UsedEquipment.equipmentId'),                         'barcode'    ],
            [ Sequelize.col('UsedEquipment.EquipmentSheet.EquipmentModel.name'), 'modelName' ],
            [ Sequelize.col('UsedEquipment.EquipmentSheet.EquipmentModel.Brand.name'), 'brandName' ],
            [ Sequelize.fn('COUNT', Sequelize.col('Repair.id')),                 'repairCount']
        ],
        include: [{
            model: models.UsedEquipment,
            attributes: [],

                include: [{
                model: models.EquipmentSheet,
                attributes: [],

                    include: [{
                        model: models.EquipmentModel,
                        attributes: [],

                            include: [{
                            model: models.Brand,
                            attributes: []
                    }]
                    }]

                }]
        }],
        group: [
            'UsedEquipment.equipmentId',
            'UsedEquipment.EquipmentSheet.EquipmentModel.name',
            'UsedEquipment.EquipmentSheet.EquipmentModel.Brand.name'
        ],
        raw: true
    });

    const repairsByStatus = await models.Repair.findAll({
        attributes: [
            [ Sequelize.col('RepairStatus.state'),              'state'       ],
            [ Sequelize.fn('COUNT', Sequelize.col('Repair.id')), 'repairCount']
        ],
        include: [{
            model: models.RepairStatus,
            attributes: []
        }],
        group: ['RepairStatus.state'],
        raw: true
    });

    const [ result ] = await models.sequelize.query(`
    SELECT 
        AVG(EXTRACT(EPOCH FROM (ts_end - ts_start))) AS avg_seconds
    FROM (
        SELECT
        "repairId",
        MIN(CASE WHEN "statusId" = 1 THEN "createdAt" END) AS ts_start,
        MAX(CASE WHEN "statusId" = 6 THEN "createdAt" END) AS ts_end
        FROM "RepairStatusLogs"
        GROUP BY "repairId"
        HAVING MAX(CASE WHEN "statusId" = 6 THEN 1 ELSE 0 END) = 1
    ) AS sub;
    `, { type: models.sequelize.QueryTypes.SELECT });

    const avgSeconds = parseFloat(result.avg_seconds).toFixed(0);
    const avgHours   = (avgSeconds / 3600).toFixed(2);
    const avgDays    = (avgSeconds / 86400).toFixed(3);


    return res.json({
        repairsByStore: repairsByStore,
        repairsByEquipmentSheet: repairsByEquipmentSheet,
        repairsByStatus: repairsByStatus,
        avgEstimateDelivaryDate: [{
            seconds: avgSeconds,
            hours: avgHours,
            days: avgDays
        }]
    })

  } catch (err) {
    return next(err);
  }
});


router.get('/projects', async (req, res, next) => {
  try {

    const donationsByType = await models.UsedEquipment.findAll({
      where: { action: 'D' },
      attributes: [
        [ Sequelize.col('EquipmentSheet.type'),               'typeId'      ],
        [ Sequelize.col('EquipmentSheet.EquipmentType.name'), 'typeName'    ],
        [ Sequelize.fn('COUNT', Sequelize.col('UsedEquipment.id')), 'donationCount' ]
      ],
      include: [{
        model: models.EquipmentSheet,
        attributes: [],
        include: [{
          model: models.EquipmentType,
          attributes: []
        }]
      }],
      group: ['EquipmentSheet.type', 'EquipmentSheet.EquipmentType.name'],
      order: [[ Sequelize.literal('"donationCount"'), 'DESC' ]],
      raw: true
    });


    const donationsByModel = await models.UsedEquipment.findAll({
      where: { action: 'D' },
      attributes: [
        [ Sequelize.col('EquipmentSheet.model'),                              'modelId'      ],
        [ Sequelize.col('EquipmentSheet.EquipmentModel.name'),                'modelName'    ],
        [ Sequelize.col('EquipmentSheet.EquipmentModel.Brand.name'),          'brandName'    ],
        [ Sequelize.fn('COUNT', Sequelize.col('UsedEquipment.id')),           'donationCount' ]
      ],
      include: [{
        model: models.EquipmentSheet,
        attributes: [],
        include: [{
          model: models.EquipmentModel,
          attributes: [],
          include: [{
            model: models.Brand,
            attributes: []
          }]
        }]
      }],
      group: [
        'EquipmentSheet.model',
        'EquipmentSheet.EquipmentModel.name',
        'EquipmentSheet.EquipmentModel.Brand.name'
      ],
      order: [[ Sequelize.literal('"donationCount"'), 'DESC' ]],
      raw: true
    });


    const donationsByStore = await models.StorePurchase.findAll({
      where: { purchasePrice: 0 },
      attributes: [
        [ Sequelize.col('Store.nipc'),          'NIPC'         ],
        [ Sequelize.col('Store.name'),          'storeName'    ],
        [ Sequelize.fn('COUNT', Sequelize.col('StorePurchase.id')), 'donationCount' ]
      ],
      include: [{
        model: models.Store,
        attributes: []
      }],
      group: ['Store.nipc', 'Store.name'],
      order: [[ Sequelize.literal('"donationCount"'), 'DESC' ]],
      raw: true
    });


    const projectsByStatus = await models.CharityProject.findAll({
      attributes: [
        [ Sequelize.col('ProjectStatus.state'),          'state'        ],
        [ Sequelize.fn('COUNT', Sequelize.col('CharityProject.id')), 'projectCount' ]
      ],
      include: [{
        model: models.ProjectStatus,
        attributes: []
      }],
      group: ['ProjectStatus.state'],
      raw: true
    });

    return res.json({
      donationsByType,
      donationsByModel,
      donationsByStore,
      projectsByStatus
    });

  } catch (err) {
    return next(err);
  }
});

router.get('/interests', async (req, res, next) => {
  try {
    const { Interest, FolderInterest, EquipmentSheet, EquipmentModel, EquipmentType } = models;

    // Total de interesses
    const totalInterests = await Interest.count();

    // Total de InterestsFolder
    const totalFolderInterests = await FolderInterest.count();

    // Interesses por tipo de equipamento
    const interestsByType = await Interest.findAll({
      attributes: [
        [fn('COUNT', col('Interest.id')), 'interestCount'],
        [col('equipmentSheet.EquipmentType.name'), 'typeName']
      ],
      include: [{
        model: EquipmentSheet,
        as: 'equipmentSheet', // este precisa existir no model Interest
        attributes: [],
        include: [{
          model: EquipmentType, // sem alias personalizado
          attributes: []
        }]
      }],
      group: ['equipmentSheet.EquipmentType.name'],
      raw: true
    });

    // Interesses por equipamento específico (EquipmentSheet)
    const interestsByEquipment = await Interest.findAll({
      attributes: [
        [fn('COUNT', col('Interest.id')), 'interestCount'],
        [col('equipmentSheet.barcode'), 'equipmentBarcode']
      ],
      include: [{
        model: EquipmentSheet,
        as: 'equipmentSheet',
        attributes: []
      }],
      group: ['equipmentSheet.barcode'],
      raw: true
    });

    // Interesses por modelo
    const interestsByModel = await Interest.findAll({
      attributes: [
        [fn('COUNT', col('Interest.id')), 'interestCount'],
        [col('equipmentSheet.EquipmentModel.name'), 'modelName']
      ],
      include: [{
        model: EquipmentSheet,
        as: 'equipmentSheet',
        attributes: [],
        include: [{
          model: EquipmentModel, // sem alias
          attributes: []
        }]
      }],
      group: ['equipmentSheet.EquipmentModel.name'],
      raw: true
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const interestsToday = await Interest.count({
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });

    return res.json({
      totalInterests,
      totalFolderInterests,
      interestsByType,
      interestsByEquipment,
      interestsByModel,
      interestsToday
    });

  } catch (err) {
    return next(err);
  }
});


module.exports = router;