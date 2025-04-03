const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

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
      name,
      brand,
      price,
      releaseYear,
      page = 1,
      pageSize = 10,
      orderBy = "name",
      orderDirection = "ASC",
    } = req.query;

    const where = {};

    if (name) where.name = { [Op.like]: `${name}%` };
    if (brand) where.brand = { [Op.like]: `${brand}%` };
    if (price) where.price = { [Op.like]: `${price}%` };
    if (releaseYear) where.releaseYear = { [Op.like]: `${releaseYear}%` };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let order = [];
    if (orderBy && orderDirection) {
      order = [[orderBy, orderDirection.toUpperCase()]];
    } else {
      order = [["name", "ASC"]];
    }

    const { count, rows } = await models.EquipmentModel.findAndCountAll({
      where,
      attributes: ["id", "name", "price", "releaseYear"],
      include: [
        {
          model: models.Brand,
          as: "Brand",
          attributes: ["name"],
        },
      ],
      limit: parseInt(pageSize),
      offset,
      order,
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: rows,
    });
  } catch (error) {
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      data: model,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating brand." });
  }
});

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

module.exports = router;
