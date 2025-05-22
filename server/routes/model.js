const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

// router.get("/", async (req, res) => {
//   try {
//     const { search } = req.query;

//     const whereCondition = search
//       ? {
//           [Op.or]: [
//             { name: { [Op.iLike]: `%${search}%` } }, // nome do modelo
//             { "$Brand.name$": { [Op.iLike]: `%${search}%` } }, // nome da marca
//           ],
//         }
//       : {};

//     const equipmentModels = await models.EquipmentModel.findAll({
//       attributes: ["id", "name", "price", "releaseYear"],
//       include: [
//         {
//           model: models.Brand,
//           as: "Brand",
//           attributes: ["name"],
//         },
//       ],
//       where: whereCondition,
//       raw: true,
//       nest: true,
//     });

//     const formattedData = equipmentModels.map((item) => ({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       releaseYear: item.releaseYear,
//       brandName: item.Brand ? item.Brand.name : null, // Evita erro se Brand for null
//     }));

//     res.status(200).json(formattedData);
//   } catch (error) {
//     res.status(500).json({ message: "Erro ao buscar os modelos." });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const {
      id,
      name,
      Brand,
      price,
      releaseYear,
      active = "1",
      page = 1,
      pageSize = 5,
      sortField = "name",
      sortOrder = "ASC",
    } = req.query;

    const where = {};

    if (id)
      where.id = sequelize.where(
        sequelize.cast(sequelize.col("EquipmentModel.id"), "varchar"),
        { [Op.iLike]: `${id}%` }
      );
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (Brand) where["$Brand.name$"] = { [Op.iLike]: `%${Brand}%` };
    if (price)
      where.price = sequelize.where(
        sequelize.cast(sequelize.col("price"), "varchar"),
        { [Op.iLike]: `${price}%` }
      );
    if (releaseYear)
      where.releaseYear = sequelize.where(
        sequelize.cast(sequelize.col("releaseYear"), "varchar"),
        { [Op.iLike]: `%${releaseYear}%` }
      );
    if (active) where.isActive = { [Op.eq]: active };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const orderClause = [];

    if (sortField === "Brand") {
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("Brand.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField === "name") {
      // Especifica a tabela EquipmentModel ao referir-se ao campo name
      orderClause.push([
        Sequelize.fn("LOWER", Sequelize.col("EquipmentModel.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      // Para outros campos, use o nome da tabela corretamente
      orderClause.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }

    const { count, rows } = await models.EquipmentModel.findAndCountAll({
      where,
      attributes: ["id", "name", "price", "releaseYear"],
      include: [
        {
          model: models.Brand,
          as: "Brand",
          attributes: ["id", "name"],
        },
      ],
      limit: parseInt(pageSize),
      offset,
      order: orderClause,
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: rows,
    });
  } catch (error) {
    console.error("Erro no GET /model:", error);
    res.status(500).json({ error: "Error fetching equipment models." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, brand, price, releaseYear } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Equipment Model name is required." });
    }
    if (!brand) {
      return res.status(400).json({ error: "Brand is required." });
    }
    if (!price) {
      return res
        .status(400)
        .json({ error: "Equipment Model price is required." });
    }
    if (!releaseYear) {
      return res
        .status(400)
        .json({ error: "Equipment Model release year is required." });
    }

    const exists = await models.EquipmentModel.findOne({
      where: { name, brand_id: brand },
    });
    if (exists) {
      return res
        .status(400)
        .json({ error: "This equipment model already exists." });
    }

    const model = await models.EquipmentModel.create({
      name,
      brand_id: brand,
      price,
      releaseYear,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      data: model,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating equipment model." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, brand, price, releaseYear } = req.body;
    const model = await models.EquipmentModel.findByPk(req.params.id);
    if (!model) {
      return res.status(404).json({ error: "Equipment Model not found" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ error: "Equipment Model name is required." });
    }
    if (!brand) {
      return res.status(400).json({ error: "Brand is required." });
    }
    if (!price) {
      return res
        .status(400)
        .json({ error: "Equipment Model price is required." });
    }
    if (!releaseYear) {
      return res
        .status(400)
        .json({ error: "Equipment Model release year is required." });
    }
    const exists = await models.EquipmentModel.findOne({
      where: { name, brand_id: brand },
    });
    if (exists && exists.price == price && exists.releaseYear == releaseYear) {
      return res
        .status(400)
        .json({ error: "This equipment model already exists." });
    }
    await model.update({
      name,
      brand_id: brand,
      price,
      releaseYear,
      updatedAt: new Date(),
    });
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: "Error updating equipment model." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const model = await models.EquipmentModel.findByPk(req.params.id);
    if (!model) {
      return res.status(404).json({ error: "Equipment Model not found" });
    }
    await model.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/activation/:id", async (req, res) => {
  try {
    const model = await models.EquipmentModel.findByPk(req.params.id);
    if (!model) {
      return res.status(404).json({ error: "Equipment Model not found" });
    }
    model.updatedAt = new Date();
    model.isActive = model.isActive === "1" ? "0" : "1";
    await model.save();
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: "Error updating equipment model." });
  }
});

module.exports = router;
