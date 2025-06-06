const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const models = require("../models");
const db = require("../models");

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
      pageSize = 5,
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
              attributes: ["id", "name", "releaseYear"],
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

router.get("/totalOnSaleStock", async (req, res) => {
	try {
		const total = await models.UsedEquipment.count({
			where: {
				putOnSaleDate: {
					[Op.ne]: null,
				},
			},
		});

		res.json({ total });
	} catch (error) {
		console.error("Error fetching total sale stock:", error);
		res.status(500).json({ error: "Error fetching total sale stock." });
	}
});

router.get("/totalSoldEquipments", async (req, res) => {
	try {
		const total = await models.UsedEquipment.count({
			where: {
				purchaseDate: {
					[Op.ne]: null,
				},
			},
		});

		res.json({ total });
	} catch (error) {
		console.error("Error fetching total sold equipments:", error);
		res.status(500).json({ error: "Error fetching total sold equipments." });
	}
});


router.get("/displayTable", async (req, res) => {
  try {
    const query = req.query;

    // Filtros
    const rawId = query.usedEquipmentId ?? query.id;
    const id = /^\d+$/.test(rawId?.trim?.()) ? parseInt(rawId.trim()) : null;

    const status = query.Status || query["EquipmentStatus.state"] || null;
    const equipmentType = query.EquipmentType || query["EquipmentSheet.EquipmentType.name"] || null;
    const store = query.Store || query["Store.name"] || null;
    const brandModel = query.BrandModel || query["EquipmentSheet.brandModel"] || null;
    const date = query['Purchase.purchaseDate'] || null

    const statusFilter = status ? `%${status}%` : null;
    const equipmentTypeFilter = equipmentType ? `%${equipmentType}%` : null;
    const storeFilter = store ? `%${store}%` : null;
    const brandModelFilter = brandModel ? `%${brandModel}%` : null;
    const price = query.price ? parseFloat(query.price) : null;

    const putOnSaleDate = query.putOnSaleDate || null;
    const purchaseDate = query.purchaseDate || null;
    const action = query.action || query.allTag || null;

    // Paginação e ordenação
    const sortField = query.sortField || "id";
    const sortOrder = query.sortOrder === "-1" ? "DESC" : "ASC";

    const page = parseInt(query.page || 1);
    const pageSize = parseInt(query.pageSize || 5);
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const filters = [
      id,                // $1
      statusFilter,      // $2
      equipmentTypeFilter, // $3
      storeFilter,       // $4
      brandModelFilter,  // $5
      price,             // $6
      putOnSaleDate,     // $7
      purchaseDate,      // $8
      date,              // $9
      action,            // $10
      sortField,         // $11
      limit,             // $12
      offset             // $13
    ];

    console.log(filters, sortOrder)

    const sql = `
SELECT 
  ue.id,
  ue.price,
  ue."putOnSaleDate",
  ue."purchaseDate",
  ue."action",
  es.barcode,
  es."createdAt" AS "sheetCreatedAt",
  es."updatedAt" AS "sheetUpdatedAt",
  em.id AS "modelId",
  em.name AS "modelName",
  em."releaseYear",
  b.id AS "brandId",
  b.name AS "brandName",
  et.id AS "typeId",
  et.name AS "typeName",
  est.id AS "statusId",
  est.state AS "statusState",
  s.nipc AS "storeNipc",
  s.name AS "storeName",
  MAX(sp."purchasePrice") AS "purchasePrice",
  MAX(sp."createdAt") AS "purchaseDate"
FROM "UsedEquipments" ue
JOIN "EquipmentSheets" es ON ue."equipmentId" = es.barcode
JOIN "EquipmentTypes" et ON es."type" = et.id
JOIN "EquipmentModels" em ON es."model" = em.id
JOIN "Brands" b ON em."brand_id" = b.id
JOIN "EquipmentStatuses" est ON ue."statusID" = est.id
JOIN "Stores" s ON ue."storeId" = s.nipc
LEFT JOIN "StorePurchases" sp ON ue.id = sp."usedEquipmentID"
WHERE
  ($1::integer IS NULL OR ue.id = $1) AND
  ($2::text IS NULL OR est.state ILIKE $2) AND
  ($3::text IS NULL OR et.name ILIKE $3) AND
  ($4::text IS NULL OR s.name ILIKE $4) AND
  ($5::text IS NULL OR (b.name || ' ' || em.name) ILIKE $5) AND
  ($6::numeric IS NULL OR ue.price = $6) AND
  ($7::date IS NULL OR DATE(ue."putOnSaleDate") = $7) AND
  ($8::date IS NULL OR DATE(ue."purchaseDate") = $8) AND
  ($9::date IS NULL OR DATE(sp."createdAt") = $9) AND
  (
    $10::text IS NULL OR $10::text = '1' OR
    CASE 
      WHEN $10::text = 'D' THEN ue."action" = 'D'
      WHEN $10::text = 'S' THEN ue."action" = 'S' OR ue."action" IS NULL
      WHEN $10::text = 'new' THEN ue."action" IS NULL
      WHEN $10::text = '0' THEN ue."action" IS NULL
      ELSE ue."action" = $10::text
    END
  ) AND
  (
    $10::text IS NULL OR $10::text = '1' OR
    CASE 
      WHEN $10::text = 'S' THEN ue."putOnSaleDate" IS NOT NULL
      WHEN $10::text = 'new' THEN ue."putOnSaleDate" IS NULL
      WHEN $10::text = '0' THEN ue."putOnSaleDate" IS NOT NULL
      ELSE ($7::date IS NULL OR DATE(ue."putOnSaleDate") = $7)
    END
  ) AND
  (
    $10::text IS NULL OR $10::text = '1' OR
    CASE 
      WHEN $10::text = '0' THEN ue."purchaseDate" IS NULL
      WHEN $10::text = 'S' THEN ue."purchaseDate" IS NOT NULL
      ELSE ($8::date IS NULL OR DATE(ue."purchaseDate") = $8)
    END
  )
GROUP BY 
  ue.id, ue.price, ue."putOnSaleDate", ue."purchaseDate", ue."action",
  es.barcode, es."createdAt", es."updatedAt",
  em.id, em.name, em."releaseYear",
  b.id, b.name,
  et.id, et.name,
  est.id, est.state,
  s.nipc, s.name
ORDER BY
  -- TEXT fields
  CASE 
    WHEN $11 = 'EquipmentSheet.EquipmentType.name' THEN et.name
    WHEN $11 = 'Store.name' THEN s.name
    WHEN $11 = 'EquipmentSheet.brandModel' THEN b.name || ' ' || em.name
    WHEN $11 = 'EquipmentStatus.state' THEN est.state
    ELSE NULL
  END ${sortOrder},

  -- NUMERIC fields
  CASE 
    WHEN $11 = 'id' THEN ue.id
    WHEN $11 = 'price' THEN ue.price
    WHEN $11 = 'Purchase.purchasePrice' THEN MAX(sp."purchasePrice")
    ELSE NULL
  END ${sortOrder},

  -- DATE fields
  CASE 
    WHEN $11 = 'putOnSaleDate' THEN ue."putOnSaleDate"
    WHEN $11 = 'Purchase.purchaseDate' THEN MAX(sp."createdAt")
    WHEN $11 = 'purchaseDate' THEN MAX(ue."purchaseDate")
    ELSE NULL
  END ${sortOrder},

  -- Desempate sempre por ID
  ue.id ASC
LIMIT $12 OFFSET $13;



    `;

const countSql = `
SELECT COUNT(DISTINCT ue.id) AS count
FROM "UsedEquipments" ue
JOIN "EquipmentSheets" es ON ue."equipmentId" = es.barcode
JOIN "EquipmentTypes" et ON es."type" = et.id
JOIN "EquipmentModels" em ON es."model" = em.id
JOIN "Brands" b ON em."brand_id" = b.id
JOIN "EquipmentStatuses" est ON ue."statusID" = est.id
JOIN "Stores" s ON ue."storeId" = s.nipc
LEFT JOIN "StorePurchases" sp ON ue.id = sp."usedEquipmentID"
WHERE
  ($1::integer IS NULL OR ue.id = $1) AND
  ($2::text IS NULL OR est.state ILIKE $2) AND
  ($3::text IS NULL OR et.name ILIKE $3) AND
  ($4::text IS NULL OR s.name ILIKE $4) AND
  ($5::text IS NULL OR (b.name || ' ' || em.name) ILIKE $5) AND
  ($6::numeric IS NULL OR ue.price = $6) AND
  ($7::date IS NULL OR DATE(ue."putOnSaleDate") = $7) AND
  ($8::date IS NULL OR DATE(ue."purchaseDate") = $8) AND
  ($9::date IS NULL OR DATE(sp."createdAt") = $9) AND

  (
    $10::text IS NULL OR $10::text = '1' OR
    CASE 
      WHEN $10::text = 'D' THEN ue."action" = 'D'
      WHEN $10::text = 'S' THEN ue."action" = 'S' OR ue."action" IS NULL
      WHEN $10::text = 'new' THEN ue."action" IS NULL
      WHEN $10::text = '0' THEN ue."action" IS NULL
      ELSE ue."action" = $10::text
    END
  ) AND
  (
    $10::text IS NULL OR $10::text = '1' OR
    CASE 
      WHEN $10::text = 'S' THEN ue."putOnSaleDate" IS NOT NULL
      WHEN $10::text = 'new' THEN ue."putOnSaleDate" IS NULL
      WHEN $10::text = '0' THEN ue."putOnSaleDate" IS NOT NULL
      ELSE ($7::date IS NULL OR DATE(ue."putOnSaleDate") = $7)
    END
  ) AND
  (
    $10::text IS NULL OR $10::text = '1' OR
    CASE 
      WHEN $10::text = '0' THEN ue."purchaseDate" IS NULL
      WHEN $10::text = 'S' THEN ue."purchaseDate" IS NOT NULL
      ELSE ($8::date IS NULL OR DATE(ue."purchaseDate") = $8)
    END
  );


`;

    // Executa queries
    const results = await db.sequelize.query(sql, {
      bind: filters,
      type: Sequelize.QueryTypes.SELECT,
    });

    const countFilters = filters.slice(0, 10);


    const [countResult] = await db.sequelize.query(countSql, {
      bind: countFilters,
      type: Sequelize.QueryTypes.SELECT,
    });

    // Formata a resposta
    const formattedData = results.map(item => ({
      id: item.id,
      price: item.price,
      putOnSaleDate: item.putOnSaleDate,
      purchaseDate: item.purchaseDate,
      action: item.action,
      EquipmentStatus: {
        id: item.statusId,
        state: item.statusState,
      },
      Store: {
        nipc: item.storeNipc,
        name: item.storeName,
      },
      EquipmentSheet: {
        barcode: item.barcode,
        brandModel: `${item.brandName} ${item.modelName}`,
        EquipmentModel: {
          id: item.modelId,
          name: item.modelName,
          releaseYear: item.releaseYear,
          Brand: {
            id: item.brandId,
            name: item.brandName,
          },
        },
        EquipmentType: {
          id: item.typeId,
          name: item.typeName,
        },
        createdAt: item.sheetCreatedAt,
        updatedAt: item.sheetUpdatedAt,
      },
      Purchase: {
        purchasePrice: item.purchasePrice ?? null,
        purchaseDate: item.purchaseDate ?? null,
      },
    }));

    res.json({
      totalItems: parseInt(countResult.count, 10),
      totalPages: Math.ceil(countResult.count / limit),
      currentPage: page,
      pageSize: limit,
      data: formattedData,
    });

  } catch (error) {
    console.error("Error in /displayTable:", error);
    res.status(500).json({ error: "Failed to load used equipment." });
  }
});


router.get("/usedEquipmentRepairs", async (req, res) => {
	try {
		const {
			id,
			price,
			equipmentId,
			storeId,
			page = 1,
			pageSize = 5,
			orderBy,
			orderDirection,
		} = req.query;

		const where = {};

		if (id && !isNaN(parseInt(id))) where.id = parseInt(id);
		if (price && !isNaN(parseFloat(price))) where.price = parseFloat(price);
		if (equipmentId) where.equipmentId = equipmentId;
		if (storeId) where.storeId = storeId;

		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		let order = [];
		if (orderBy && orderDirection) {
			order = [[orderBy, orderDirection.toUpperCase()]];
		} else {
			order = [["id", "ASC"]];
		}

		const { count, rows } = await models.UsedEquipment.findAndCountAll({
			where,
			limit: parseInt(pageSize),
			offset,
			order,
		});
		
		const formattedData = rows.map((item) => ({
			id: item.id,
			price: item.price,
			equipmentId: item.equipmentId,
			storeId: item.storeId,
		}));

		res.json({
			totalItems: count,
			totalPages: Math.ceil(count / pageSize),
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
			data: formattedData,
		});
	} catch (error) {
		console.error("Error fetching clients:", error);
		res.status(500).json({ error: "Error fetching clients." });
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


router.get("/by-used-equiment-id/:ID", async (req, res) => {
	try {
		const { ID } = req.params;

		const usedEquipments = await models.UsedEquipment.findOne({
			where: { id: ID },
			include: [
				{
					model: models.EquipmentSheet,
					as: "EquipmentSheet",
					include: [
						{
							model: models.EquipmentModel,
							as: "EquipmentModel", // este 'as' tem de bater certo com o que definiste no `belongsTo`
							attributes: ["name"],
						},
					],
				},
				{
					model: models.Store,
					as: "Store",
					attributes: ["name"],
				},
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

router.post('/', async (req, res) => {
  const {
    statusID,
    price,
    putOnSaleDate,
    purchaseDate,
    equipmentId,
    storeId,
    action
  } = req.body;

  try {
    // (Opcional) Verificar se as FK existem
    const status = await models.EquipmentStatus.findByPk(statusID);
    if (!status) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    const sheet = await models.EquipmentSheet.findByPk(equipmentId);
    if (!sheet) {
      return res.status(400).json({ error: 'EquipmentSheet não encontrado' });
    }
    const store = await models.Store.findByPk(storeId);
    if (!store) {
      return res.status(400).json({ error: 'Store não encontrada' });
    }

    // Criar novo registo em UsedEquipments
    const used = await UsedEquipment.create({
      statusID,
      price,
      putOnSaleDate,
      purchaseDate,
      equipmentId,
      storeId,
      action
    });

    return res.status(201).json(used);
  } catch (err) {
    console.error('Erro ao criar UsedEquipment:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});


router.patch("/:ID", async (req, res) => {
  const { ID } = req.params;
  const {
    statusID,
    price,
    putOnSaleDate,
    purchaseDate,
    equipmentId,
    storeId,
    action,
  } = req.body;

  // try {
    const used = await models.UsedEquipment.findByPk(ID);
    if (!used) {
      return res.status(404).json({ error: "UsedEquipment não encontrado." });
    }

    if (statusID !== undefined) used.statusID = statusID;
    if (price !== undefined) used.price = price;
    if (putOnSaleDate !== undefined) used.putOnSaleDate = putOnSaleDate;
    if (purchaseDate !== undefined) used.purchaseDate = purchaseDate;
    if (equipmentId !== undefined) used.equipmentId = equipmentId;
    if (storeId !== undefined) used.storeId = storeId;
    if (action !== undefined) used.action = action;

    used.updatedAt = new Date();

    await used.save();

    res.status(200).json({ message: "Atualizado com sucesso", data: used });
  // } catch (err) {
  //   console.error("Erro ao atualizar UsedEquipment:", err);
  //   res.status(500).json({ error: "Erro interno ao atualizar UsedEquipment." });
  // }
});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
