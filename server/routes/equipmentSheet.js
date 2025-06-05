const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");

// router.get("/", async (req, res) => {
//   try {
//     const {
//       barcode,
//       modelId,
//       typeId,
//       brandId,
//       createdFrom,
//       createdTo,
//       updatedFrom,
//       updatedTo,
//       page = 1,
//       pageSize = 6,
//       orderBy = "createdAt",
//       orderDirection = "DESC",
//     } = req.query;

//     // Construção do objeto 'where' dinamicamente
//     const where = {};

//     if (barcode) where.barcode = barcode;
//     if (createdFrom || createdTo) {
//       where.createdAt = {};
//       if (createdFrom) where.createdAt[Op.gte] = new Date(createdFrom);
//       if (createdTo) where.createdAt[Op.lte] = new Date(createdTo);
//     }
//     if (updatedFrom || updatedTo) {
//       where.updatedAt = {};
//       if (updatedFrom) where.updatedAt[Op.gte] = new Date(updatedFrom);
//       if (updatedTo) where.updatedAt[Op.lte] = new Date(updatedTo);
//     }

//     // Condições para relacionamentos
//     const modelCondition = modelId ? { id: modelId } : {};
//     const typeCondition = typeId ? { id: typeId } : {};
//     const brandCondition = brandId ? { id: brandId } : {};

//     // Paginação
//     const offset = (parseInt(page) - 1) * parseInt(pageSize);

//     // Ordenação
//     const order = [[orderBy, orderDirection.toUpperCase()]];

//     // Busca com contagem para paginação
//     const { count, rows } = await models.EquipmentSheet.findAndCountAll({
//       where,
//       include: [
//         {
//           model: models.EquipmentModel,
//           as: "EquipmentModel",
//           where: modelCondition,
//           attributes: ["id", "name"],
//           include: [
//             {
//               model: models.Brand,
//               as: "Brand",
//               where: brandCondition,
//               attributes: ["id", "name"],
//             },
//           ],
//         },
//         {
//           model: models.EquipmentType,
//           as: "EquipmentType",
//           where: typeCondition,
//           attributes: ["id", "name"],
//         },
//       ],
//       attributes: ["barcode", "createdAt", "updatedAt"],
//       limit: parseInt(pageSize),
//       offset,
//       order,
//     });

//     const formattedData = rows.map((item) => ({
//       Barcode: item.barcode,
//       CreatedAt: item.createdAt,
//       UpdatedAt: item.updatedAt,
//       EquipmentModel: {
//         id: item.EquipmentModel.id,
//         name: item.EquipmentModel.name,
//       },
//       Brand: {
//         id: item.EquipmentModel.Brand.id,
//         name: item.EquipmentModel.Brand.name,
//       },
//       EquipmentType: {
//         id: item.EquipmentType.id,
//         name: item.EquipmentType.name,
//       },
//     }));
//     // Retorno da resposta formatada
//     res.json({
//       totalItems: count,
//       totalPages: Math.ceil(count / pageSize),
//       currentPage: parseInt(page),
//       pageSize: parseInt(pageSize),
//       data: formattedData,
//     });
//   } catch (error) {
//     console.error("Error fetching equipment sheets:", error);
//     res.status(500).json({ error: "Error fetching equipment sheets." });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const {
      Barcode,
      EquipmentModel: model,
      EquipmentType: type,
      Brand,
      BrandModel,
      active = '1',
      page = 1,
      pageSize = 5,
      sortField = 'EquipmentModel',
      sortOrder = 'ASC',
    } = req.query;

    const where = {};

    // Barcode filter
    if (Barcode) {
      where.barcode = { [Op.iLike]: `%${Barcode}%` };
    }

    // Active status filter
    if (active !== undefined) {
      where.isActive = { [Op.eq]: active };
    }

    // Combined BrandModel filter takes precedence
    if (BrandModel) {
      where[Op.or] = [
        { '$EquipmentModel.name$': { [Op.iLike]: `%${BrandModel}%` } },
        { '$EquipmentModel.Brand.name$': { [Op.iLike]: `%${BrandModel}%` } },
      ];
    } else {
      // Separate Model filter
      if (model) {
        where['$EquipmentModel.name$'] = { [Op.iLike]: `%${model}%` };
      }
      // Separate Brand filter
      if (Brand) {
        where['$EquipmentModel.Brand.name$'] = { [Op.iLike]: `%${Brand}%` };
      }
    }

    // EquipmentType filter
    if (type) {
      where['$EquipmentType.name$'] = { [Op.iLike]: `%${type}%` };
    }

    // Pagination
    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Sorting
    const order = [];
    const direction = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    switch (sortField) {
      case 'Brand':
        order.push([Sequelize.col('EquipmentModel.Brand.name'), direction]);
        break;
      case 'EquipmentModel':
        order.push([Sequelize.col('EquipmentModel.name'), direction]);
        break;
      case 'EquipmentType':
        order.push([Sequelize.col('EquipmentType.name'), direction]);
        break;
      case 'Barcode':
        order.push([Sequelize.col('barcode'), direction]);
        break;
      default:
        order.push([Sequelize.col(sortField), direction]);
    }

    // Fetch
    const result = await models.EquipmentSheet.findAndCountAll({
      where,
      include: [
        {
          model: models.EquipmentModel,
          as: 'EquipmentModel',
          attributes: ['id', 'name'],
          include: [
            { model: models.Brand, as: 'Brand', attributes: ['id', 'name'] },
          ],
        },
        { model: models.EquipmentType, as: 'EquipmentType', attributes: ['id', 'name'] },
      ],
      limit,
      offset,
      order,
    });

    // Format response
    const formattedData = result.rows.map(item => ({
      Barcode: item.barcode,
      CreatedAt: item.createdAt,
      UpdatedAt: item.updatedAt,
      EquipmentModel: { id: item.EquipmentModel.id, name: item.EquipmentModel.name },
      Brand: { id: item.EquipmentModel.Brand.id, name: item.EquipmentModel.Brand.name },
      EquipmentType: { id: item.EquipmentType.id, name: item.EquipmentType.name },
    }));

    res.json({
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: parseInt(page, 10),
      pageSize: limit,
      data: formattedData,
    });

  } catch (error) {
    console.error('Error fetching equipment sheets:', error);
    res.status(500).json({ error: 'Error fetching equipment sheets.' });
  }
});


router.get("/in-stock", async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 5,
      orderBy = "recent-date", // Valor padrão
      modelId,
      typeId,
      brandId,
    } = req.query;

    // Construção do objeto 'where' dinamicamente
    const where = {};

    const modelCondition = modelId ? { id: modelId } : {};
    const typeCondition = typeId ? { id: typeId } : {};
    const brandCondition = brandId ? { id: brandId } : {};
    console.log(modelId, typeId, brandId);

    // Calculando o offset com base na página
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // Consulta ao banco de dados
    const { count, rows } = await models.EquipmentSheet.findAndCountAll({
      where,
      include: [
        {
          model: models.UsedEquipment,
          where: { purchaseDate: null, putOnSaleDate: { [Op.not]: null } },
          as: "UsedEquipments",
          required: true,
        },
        {
          model: models.EquipmentModel,
          as: "EquipmentModel",
          where: modelCondition,
          attributes: ["name", "price", "releaseYear"],
          include: [
            {
              model: models.Brand,
              as: "Brand",
              where: brandCondition,
              attributes: ["name"],
            },
          ],
        },
        {
          model: models.EquipmentType,
          as: "EquipmentType",
          where: typeCondition,
          attributes: ["name"],
        },
      ],
      limit: parseInt(pageSize),
      offset,
    });

    const formattedData = rows.map((item) => ({
      Barcode: item.barcode,
      CreatedAt: item.createdAt,
      UpdatedAt: item.updatedAt,
      EquipmentModel: item.EquipmentModel.name,
      Brand: item.EquipmentModel.Brand.name,
      EquipmentType: item.EquipmentType.name,
    }));

    switch (orderBy) {
      case "recent-date":
        formattedData.sort(
          (a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime()
        );
        break;
      case "oldest-date":
        formattedData.sort(
          (a, b) => a.CreatedAt.getTime() - b.CreatedAt.getTime()
        );
        break;
      case "ASC":
        formattedData.sort((a, b) =>
          a.EquipmentModel.localeCompare(b.EquipmentModel)
        );
        break;
      case "DESC":
        formattedData.sort((a, b) =>
          b.EquipmentModel.localeCompare(a.EquipmentModel)
        );
        break;
    }

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: formattedData,
      // data: rows,
    });
  } catch (error) {
    console.error("Error fetching equipment sheets:", error);
    res.status(500).json({ error: "Error fetching equipment sheets." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { barcode, model, type } = req.body;
    if (!barcode) {
      return res
        .status(400)
        .json({ error: "Equipment Sheet barcode is required." });
    }
    if (!model) {
      return res.status(400).json({ error: "Equipment model is required." });
    }
    if (!type) {
      return res.status(400).json({ error: "Equipment type is required." });
    }

    const exists = await models.EquipmentSheet.findByPk(barcode);
    if (exists) {
      return res
        .status(400)
        .json({ error: "This equipment model already exists." });
    }

    const newEquipmentSheet = await models.EquipmentSheet.create({
      barcode: barcode,
      model: model,
      type: type,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ data: newEquipmentSheet });
  } catch (error) {
    console.error("Error creating equipment sheet:", error);
    res.status(500).json({ error: "Error creating equipment sheet." });
  }
});

router.get("/:ID", async (req, res) => {
  try {
    const { modelId, typeId, brandId } = req.query;
    const { ID } = req.params;

    const modelCondition = modelId ? { id: modelId } : {};
    const typeCondition = typeId ? { id: typeId } : {};
    const brandCondition = brandId ? { id: brandId } : {};

    const equipmentSheet = await models.EquipmentSheet.findOne({
      where: { barcode: ID },
      include: [
        {
          model: models.EquipmentModel,
          as: "EquipmentModel",
          where: modelCondition,
          attributes: ["name", "price", "releaseYear"],
          include: [
            {
              model: models.Brand,
              as: "Brand",
              where: brandCondition,
              attributes: ["name"],
            },
          ],
        },
        {
          model: models.EquipmentType,
          as: "EquipmentType",
          where: typeCondition,
          attributes: ["name"],
        },
      ],
      attributes: ["barcode"],
    });

    if (!equipmentSheet) {
      return res.status(404).json({ error: "EquipmentSheet not found." });
    }

    res.json({ equipmentSheet });
  } catch (error) {
    console.error("Error fetching equipment sheet:", error);
    res.status(500).json({ error: "Error fetching equipment sheet." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { barcode, model, type } = req.body;
    const equipmentSheet = await models.EquipmentSheet.findByPk(req.params.id);
    if (!equipmentSheet) {
      return res.status(404).json({ error: "EquipmentSheet not found." });
    }
    if (!barcode) {
      return res
        .status(400)
        .json({ error: "Equipment sheet barcode is required." });
    }
    if (!model) {
      return res.status(400).json({ error: "Equipment model is required." });
    }
    if (!type) {
      return res.status(400).json({ error: "Equipment type is required." });
    }

    const exists = await models.EquipmentSheet.findByPk(barcode);
    if (equipmentSheet.barcode !== barcode && exists) {
      return res.status(400).json({ error: "This barcode already exists." });
    }

    await equipmentSheet.update({ barcode, model, type });
    res.status(200).json(equipmentSheet);
  } catch (error) {
    res.status(500).json({ error: "Error updating equipment sheet." });
    console.log(error)
  }
});

router.delete("/:ID", async (req, res) => {
  try {
    const equipmentSheet = await models.EquipmentSheet.findByPk(req.params.ID);
    if (!equipmentSheet) {
      return res.status(404).json({ error: "Equipment sheet not found." });
    }

    await models.UsedEquipment.destroy({
      where: { equipmentId: req.params.ID },
    });

    await equipmentSheet.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting equipment sheet:", error);
    res.status(500).json({ error: "Error deleting equipment sheet." });
  }
});

router.patch("/activation/:id", async (req, res) => {
  try {
    const equipmentSheet = await models.EquipmentSheet.findByPk(req.params.id);
    if (!equipmentSheet) {
      return res.status(404).json({ error: "Equipment sheet not found" });
    }
    equipmentSheet.updatedAt = new Date();
    equipmentSheet.isActive = equipmentSheet.isActive === "1" ? "0" : "1";
    await equipmentSheet.save();
    res.status(200).json(equipmentSheet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating equipment model." });
  }
});

router.get("/:ID/part", (req, res) => {});

module.exports = router;
