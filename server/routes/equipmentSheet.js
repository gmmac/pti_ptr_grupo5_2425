const express = require("express");
const router = express.Router();
const models = require("../models");

const { Op } = require("sequelize");

router.get("/", async (req, res) => {
    // try {
        const {
            barcode,
            model,
            releaseYear,
            type,
            page = 1,
            pageSize = 10,
            orderBy,
            orderDirection,
        } = req.query;

        console.log('------------------------',req.query)
        const where = {};
        const equipmentModelCondition = {};

        if (barcode) where.barcode = { [Op.like]: `${barcode}%` };
        if (releaseYear) equipmentModelCondition.releaseYear = { [Op.eq]: releaseYear }

        if (model) {
            where['$EquipmentModel.name$'] = { [Op.like]: `${model}%` };
        }
        
        if (type) {
            where['$EquipmentType.name$'] = { [Op.like]: `${type}%` };
        }

        const offset = (parseInt(page) - 1) * parseInt(pageSize);

        let order = [];
        if (orderBy && orderDirection) {
            order = [[orderBy, orderDirection.toUpperCase()]];
        } else {
            order = [["barcode", "ASC"]];
        }

        const { count, rows } = await models.EquipmentSheet.findAndCountAll({
            where,

            include: [
                {
                    where: equipmentModelCondition,
                    model: models.EquipmentModel,
                    attributes: ["name", "releaseYear"],
                },
                {
                    model: models.EquipmentType,
                    attributes: ["name"],
                }
            ],

            limit: parseInt(pageSize),
            offset,
            order,
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
            data: rows,
        });
    // } catch (error) {
    //     console.error("Error fetching equipments:", error);
    //     res.status(500).json({ error: "Error fetching equipments." });
    // }
});


router.get("/in-stock", async (req, res) => {
    // try {
        const {
            modelId,
            typeId,
            page = 1,
            pageSize = 6,
            orderBy = "createdAt",  // Valor padrão
            orderDirection = "DESC",  // Valor padrão
            brandId,
        } = req.query;

        // Construção do objeto 'where' dinamicamente
        const where = {};

        const modelCondition = modelId ? { id: modelId } : {};
        const typeCondition = typeId ? { id: typeId } : {};
        const brandCondition = brandId ? { id: brandId } : {};

        // Calculando o offset com base na página
        const offset = (parseInt(page) - 1) * parseInt(pageSize);

        // Construindo a ordenação
        const order = [[orderBy, orderDirection.toUpperCase()]];

        // Consulta ao banco de dados
        const { count, rows } = await models.EquipmentSheet.findAndCountAll({
            where,
            include: [
                // {
                //     model: models.UsedEquipment,  // Inclui os equipamentos usados
                //     as: "UsedEquipments",  // Alias para o relacionamento
                //     required: true,  // Isso garante que só as EquipmentSheet com UsedEquipments associados sejam retornadas
                // },
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
            limit: parseInt(pageSize),
            offset,
            order,
        });

        // Retorno da resposta com a paginação
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
            data: rows,
        });
    // } catch (error) {
    //     console.error("Error fetching equipment sheets:", error);
    //     res.status(500).json({ error: "Error fetching equipment sheets." });
    // }
});

router.post("/", (req, res) => {});

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

router.put("/:ID", (req, res) => {});

router.delete("/:ID", (req, res) => {});

router.get("/:ID/part", (req, res) => {});

module.exports = router;
