const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const {
      Barcode,
      EquipmentModel,
      EquipmentType,
      Brand,
      Store,
      Status,
      active = "1",
      page = 1,
      pageSize = 6,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const orderClause = [];

    // Ordenação com alias e colunas associadas
    if (sortField === "Brand") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("EquipmentSheet.EquipmentModel.Brand.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "EquipmentModel") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("EquipmentSheet.EquipmentModel.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "EquipmentType") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("EquipmentSheet.EquipmentType.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "Store") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("Store.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const where = {};
    const sheetWhere = {};

    if (Barcode) sheetWhere.barcode = { [Op.iLike]: `%${Barcode}%` };
    if (EquipmentModel)
      sheetWhere["$EquipmentModel.name$"] = { [Op.iLike]: `%${EquipmentModel}%` };
    if (EquipmentType)
      sheetWhere["$EquipmentType.name$"] = { [Op.iLike]: `%${EquipmentType}%` };
    if (Brand)
      sheetWhere["$EquipmentModel.Brand.name$"] = { [Op.iLike]: `%${Brand}%` };
    if (Store)
      where["$Store.name$"] = { [Op.iLike]: `%${Store}%` };
    if (Status)
      where.statusID = { [Op.eq]: Status };
    if (active)
      sheetWhere.isActive = { [Op.eq]: active };

    where.action = {
      [Op.or]: [
        { [Op.ne]: 'D' },
        { [Op.is]: null },
        { [Op.eq]: 'S' }

      ]
    };


    const { count, rows } = await models.UsedEquipment.findAndCountAll({
      where,
      include: [
        {
          model: models.EquipmentSheet,
          where: sheetWhere,
          attributes: ["barcode", "createdAt", "updatedAt"],
          include: [
            {
              model: models.EquipmentModel,
              as: "EquipmentModel",
              attributes: ["id", "name"],
              include: [
                {
                  model: models.Brand,
                  as: "Brand",
                  attributes: ["id", "name"],
                },
              ],
            },
            {
              model: models.EquipmentType,
              as: "EquipmentType",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: models.EquipmentStatus,
          as: "EquipmentStatus",
          attributes: ["id", "state"],
        },
        {
          model: models.Store,
          attributes: ["nipc", "name"],
        },
      ],
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    const formattedData = rows.map((item) => ({
      id: item.id,
      price: item.price,
      putOnSaleDate: item.putOnSaleDate,
      purchaseDate: item.purchaseDate,
      action: item.action,
      EquipmentStatus: item.EquipmentStatus,
      Store: item.Store,
      EquipmentSheet: {
        barcode: item.EquipmentSheet.barcode,
        EquipmentModel: item.EquipmentSheet.EquipmentModel,
        EquipmentType: item.EquipmentSheet.EquipmentType,
        createdAt: item.EquipmentSheet.createdAt,
        updatedAt: item.EquipmentSheet.updatedAt,
      },
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching used equipment:", error);
    res.status(500).json({ error: "Error fetching used equipment." });
  }
});


router.get("/displayTable", async (req, res) => {
  try {
    const {
      Barcode,
      EquipmentType,
      BrandModel,          // agora usamos este único campo
      Store,
      Status,
      active = "1",
      page = 1,
      pageSize = 6,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // Função que concatena Brand.name + ' ' + EquipmentModel.name
    const brandModelConcat = Sequelize.fn(
      'concat',
      Sequelize.col("EquipmentSheet.EquipmentModel.Brand.name"),
      ' ',
      Sequelize.col("EquipmentSheet.EquipmentModel.name")
    );

    // Montagem do ORDER BY
    const orderClause = [];
    if (sortField === "BrandModel") {
      orderClause.push([
        Sequelize.fn("LOWER", brandModelConcat),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "EquipmentType") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("EquipmentSheet.EquipmentType.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    // Montagem do WHERE
    const where = {};
    const sheetWhere = {};

    if (Barcode) {
      sheetWhere.barcode = { [Op.iLike]: `%${Barcode}%` };
    }
    if (EquipmentType) {
      sheetWhere["$EquipmentType.name$"] = { [Op.iLike]: `%${EquipmentType}%` };
    }
    // Novo filtro unificado BrandModel
    if (BrandModel) {
      sheetWhere[Op.and] = Sequelize.where(
        Sequelize.fn('LOWER', brandModelConcat),
        { [Op.iLike]: `%${BrandModel.toLowerCase()}%` }
      );
    }
    if (Store) {
      where["$Store.name$"] = { [Op.iLike]: `%${Store}%` };
    }
    if (Status) {
      where.statusID = { [Op.eq]: Status };
    }
    if (active) {
      sheetWhere.isActive = { [Op.eq]: active };
    }

    where.action = {
      [Op.or]: [
        { [Op.ne]: 'D' },
        { [Op.is]: null },
        { [Op.eq]: 'S' }

      ]
    };


    const { count, rows } = await models.UsedEquipment.findAndCountAll({
      where,
      include: [
        {
          model: models.EquipmentSheet,
          where: sheetWhere,
          attributes: ["barcode", "createdAt", "updatedAt"],
          include: [
            {
              model: models.EquipmentModel,
              as: "EquipmentModel",
              attributes: ["id", "name"],
              include: [
                {
                  model: models.Brand,
                  as: "Brand",
                  attributes: ["id", "name"],
                },
              ],
            },
            {
              model: models.EquipmentType,
              as: "EquipmentType",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: models.EquipmentStatus,
          as: "EquipmentStatus",
          attributes: ["id", "state"],
        },
        {
          model: models.Store,
          attributes: ["nipc", "name"],
        },
      ],
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    const formattedData = rows.map((item) => ({
      id: item.id,
      price: item.price,
      putOnSaleDate: item.putOnSaleDate,
      purchaseDate: item.purchaseDate,
      action: item.action,
      EquipmentStatus: item.EquipmentStatus,
      Store: item.Store,
      EquipmentSheet: {
        barcode: item.EquipmentSheet.barcode,
        brandModel: item.EquipmentSheet.EquipmentModel.Brand.name + " " + item.EquipmentSheet.EquipmentModel.name,
        EquipmentModel: item.EquipmentSheet.EquipmentModel,
        EquipmentType: item.EquipmentSheet.EquipmentType,
        createdAt: item.EquipmentSheet.createdAt,
        updatedAt: item.EquipmentSheet.updatedAt,
      },
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: formattedData,
    });

  } catch (error) {
    console.error("Error fetching used equipment:", error);
    res.status(500).json({ error: "Error fetching used equipment." });
  }
});


router.get("/:ID", async (req, res) => {
	try {
		const { ID } = req.params;

		const usedEquipments = await models.UsedEquipment.findAll({
			where: { equipmentId: ID },
			include: [
				{ model: models.Store, as: "Store", attributes: ["name"] },
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					attributes: ["state"],
				},
			],
		});

		res.json({ usedEquipments });
	} catch (error) {
		console.error("Error fetching used equipments:", error);
		res.status(500).json({ error: "Error fetching used equipments." });
	}
});

// ver os que estão disponiveis para compra
router.get("/in-stock/:ID", async (req, res) => {
	try {
		const { ID } = req.params;

		const usedEquipments = await models.UsedEquipment.findAll({
			where: {
				equipmentId: ID,
				purchaseDate: null,
				putOnSaleDate: { [Op.not]: null },
			},
			include: [
				{ model: models.Store, as: "Store", attributes: ["name"] },
				{
					model: models.EquipmentStatus,
					as: "EquipmentStatus",
					attributes: ["state"],
				},
			],
		});

		res.json({ usedEquipments });
	} catch (error) {
		console.error("Error fetching used equipments:", error);
		res.status(500).json({ error: "Error fetching used equipments." });
	}
});

router.get("/price-range/:equipmentId", async (req, res) => {
	try {
		const { equipmentId } = req.params;

		const priceRes = await models.UsedEquipment.findAll({
			attributes: ["price"],
			where: { equipmentId: { [Op.eq]: equipmentId } },
			order: [["price", "ASC"]],
		});
		const priceRange = priceRes.map((item) => item.price);

		if (priceRange.length === 0) {
			return res.status(200).json({ price: "-" });
		}
		if (priceRange.length === 1) {
			// Se houver apenas um equipamento, retorna apenas o preço
			return res.status(200).json({ price: priceRange[0] });
		} else if (priceRange.length > 1) {
			// Se houver mais de um, retorna o preço mínimo e máximo
			res.status(200).json({
				minPrice: Math.min(...priceRange),
				maxPrice: Math.max(...priceRange),
			});
		}
	} catch (error) {
		console.error("Error fetching price range:", error);
		res.status(500).json({ message: "Error fetching price range." });
	}
});

router.post("/", (req, res) => {});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
