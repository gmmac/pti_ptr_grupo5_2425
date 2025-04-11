const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const {
      startDate,
      completionDate,
      status,
      projectName,
      warehouseID,
      organizerNic,
      page = 1,
      pageSize = 4,
      orderBy = "id",
      orderDirection = "ASC",
    } = req.query;

    const where = {};

    console.log(projectName)

    if (startDate) where.startDate = { [Op.gte]: startDate };
    if (completionDate) where.completionDate = { [Op.lte]: completionDate };
    if (status) where.status = { [Op.eq]: parseInt(status) };
    if (warehouseID) where.warehouseID = { [Op.eq]: parseInt(warehouseID) };
    if (organizerNic) where.organizerNic = { [Op.like]: `%${organizerNic}%` };
    if (projectName) where.name = { [Op.like]: `%${projectName}%` };

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const order = [[orderBy, orderDirection.toUpperCase()]];

    const { count, rows } = await models.CharityProject.findAndCountAll({
      where,
      include: [
        {
          model: models.ProjectStatus,
          attributes: ["id", "state"],
        },
        {
          model: models.Warehouse,
          attributes: ["id", "name"],
        },
        {
          model: models.Organizer,
          attributes: ["nic", "firstName", "lastName", "email"],
        },
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
  } catch (error) {
    console.error("Error fetching charity projects:", error);
    res.status(500).json({ error: "Error fetching charity projects." });
  }
});

module.exports = router;


router.post("/", async (req, res) => {
    const {
        startDate,
        completionDate,
        projectName,
        warehouseID,
        // totalSpace,
    } = req.body;

    const currentOrganizer = req.cookies.organizerInfo;

    if (!currentOrganizer || !currentOrganizer.nic) {
        return res.status(400).json({ error: "Organizer not found." });
    }

    try {
        const newProject = await models.CharityProject.create({
            startDate: startDate,
            completionDate: completionDate,
            name: projectName,
            status: 1, // "created"
            warehouseID: warehouseID,
            // totalSpace: totalSpace,
            organizerNic: currentOrganizer.nic,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating Charity Project:", error);
        return res.status(500).json({ error: "Error creating Charity Project" });
    }
});

router.post("/linkEquipmentType", async (req, res) => {
  try {
    const { charityProjectId, equipmentTypeIds } = req.body;

    if (!charityProjectId || !Array.isArray(equipmentTypeIds)) {
      return res.status(400).json({ error: "charityProjectId and equipmentTypeIds[] are required." });
    }

    await models.CharityProjectEquipmentType.destroy({
      where: { charityProjectId }
    });

    const records = equipmentTypeIds.map((e) => ({
      charityProjectId,
      equipmentTypeId: e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const created = await models.CharityProjectEquipmentType.bulkCreate(records);

    res.status(201).json({
      message: "Tipos de equipamento atualizados com sucesso.",
      insertedCount: created.length,
      data: created
    });
  } catch (error) {
    console.error("Error updating CharityProjectEquipmentType:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.post("/linkEquipmentSheet", async (req, res) => {
  try {
    const { charityProjectId, equipmentSheetIds } = req.body;


    if (!charityProjectId || !Array.isArray(equipmentSheetIds)) {
      return res.status(400).json({ error: "charityProjectId and equipmentSheetIds[] are required." });
    }

    await models.EquipmentSheetCharityProject.destroy({
      where: { charityProjectId }
    });

    const records = equipmentSheetIds.map((e) => ({
      charityProjectId,
      equipmentSheetId: e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const created = await models.EquipmentSheetCharityProject.bulkCreate(records);

    res.status(201).json({
      message: "Equipment Sheets update sucessfully.",
      insertedCount: created.length,
      data: created
    });
  } catch (error) {
    console.error("Error updating CharityProjectEquipmentSheet:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.get("/:id/equipmentTypes", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      pageSize = 10,
      name = "",
      orderBy = "id",
      orderDirection = "ASC"
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const project = await models.CharityProject.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: "Charity Project not found." });
    }

    // Buscar IDs vinculados
    const linkedRecords = await models.CharityProjectEquipmentType.findAll({
      where: { charityProjectId: id },
      attributes: ['equipmentTypeId']
    });

    const equipmentTypeIds = linkedRecords.map(r => r.equipmentTypeId);

    // Buscar os EquipmentTypes com os filtros
    const { count, rows } = await models.EquipmentType.findAndCountAll({
      where: {
        id: equipmentTypeIds,
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      order: [[orderBy, orderDirection.toUpperCase()]],
      offset,
      limit
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      pageSize: limit,
      data: rows
    });

  } catch (error) {
    console.error("Erro ao buscar tipos vinculados ao projeto:", error);
    res.status(500).json({ error: "Erro ao buscar tipos vinculados ao projeto." });
  }
});

router.get("/:id/equipmentSheet", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      pageSize = 10,
      barcode = "",
      orderBy = "barcode",
      orderDirection = "ASC"
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const project = await models.CharityProject.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Charity Project not found." });
    }

    const linkedRecords = await models.EquipmentSheetCharityProject.findAll({
      where: { charityProjectId: id },
      attributes: ['equipmentSheetId']
    });

    const equipmentSheetIds = linkedRecords.map(record => record.equipmentSheetId);

    const { count, rows } = await models.EquipmentSheet.findAndCountAll({
      where: {
        barcode: {
          [Op.in]: equipmentSheetIds,
          [Op.iLike]: `%${barcode}%`
        }
      },      
      include: [
        {
          model: models.EquipmentModel,
          attributes: ['id', 'name'],
          include: [
            {
              model: models.Brand,
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: models.EquipmentType,
          attributes: ['id', 'name']
        }
      ],
      order: [[orderBy, orderDirection.toUpperCase()]],
      offset,
      limit
    });

    const formattedRows = rows.map((item) => ({
      Barcode: item.barcode,
      CreatedAt: item.createdAt,
      UpdatedAt: item.updatedAt,
      EquipmentModel: {
        id: item.EquipmentModel?.id,
        name: item.EquipmentModel?.name
      },
      Brand: {
        id: item.EquipmentModel?.Brand?.id,
        name: item.EquipmentModel?.Brand?.name
      },
      EquipmentType: {
        id: item.EquipmentType?.id,
        name: item.EquipmentType?.name
      }
    }));

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      pageSize: limit,
      data: formattedRows
    });

  } catch (error) {
    console.error("Erro ao buscar EquipmentSheets vinculados ao projeto:", error);
    res.status(500).json({ error: "Erro ao buscar EquipmentSheets vinculados ao projeto." });
  }
});



router.get("/:ID", async (req, res) => {
  const { ID } = req.params;

  try {
    const project = await models.CharityProject.findByPk(ID, {
      include: [
        { association: 'Warehouse' },
        { association: 'ProjectStatus' },
      ]
    });

    console.log(project.dataValues)
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/:ID', async (req, res) => {
  const projectId = req.params.ID;
  const { name, startDate, completionDate, warehouseID, statusID } = req.body;

  try {
    const project = await models.CharityProject.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.name = name || project.name;
    project.startDate = startDate || project.startDate;
    project.completionDate = completionDate || project.completionDate;
    project.warehouseID = warehouseID || project.warehouseID;
    project.status = statusID || project.status;

    await project.save();

    return res.status(200).json({ message: 'Project updated successfully', data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:ID', async (req, res) => {
  const projectId = req.params.ID;
  try {
    const deleted = await models.CharityProject.destroy({ where: { id: projectId } });

    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
