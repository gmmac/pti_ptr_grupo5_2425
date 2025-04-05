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
      warehouseID,
      organizerNic,
      page = 1,
      pageSize = 4,
      orderBy = "id",
      orderDirection = "ASC",
    } = req.query;

    const where = {};

    if (startDate) where.startDate = { [Op.gte]: startDate };
    if (completionDate) where.completionDate = { [Op.lte]: completionDate };
    if (status) where.status = { [Op.eq]: parseInt(status) };
    if (warehouseID) where.warehouseID = { [Op.eq]: parseInt(warehouseID) };
    if (organizerNic) where.organizerNic = { [Op.like]: `%${organizerNic}%` };

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

    const records = equipmentTypeIds.map((e) => ({
      charityProjectId,
      equipmentTypeId: e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const created = await models.CharityProjectEquipmentType.bulkCreate(records, {
      ignoreDuplicates: true
    });

    res.status(201).json({
      message: "Tipos de equipamento vinculados com sucesso (ignorando duplicados).",
      insertedCount: created.length,
      data: created
    });
  } catch (error) {
    console.error("Error creating CharityProjectEquipmentType:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete('/unlinkEquipmentType', async (req, res) => {
  try {
    const { charityProjectId, equipmentTypeId } = req.body;

    if (!charityProjectId || !equipmentTypeId) {
      return res.status(400).json({ error: 'charityProjectId and equipmentTypeId are required.' });
    }

    const deletedCount = await models.CharityProjectEquipmentType.destroy({
      where: {
        charityProjectId,
        equipmentTypeId
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'No relation found to delete.' });
    }

    return res.status(200).json({ message: 'Equipment type unlinked successfully.', deletedCount });
  } catch (error) {
    console.error('Error unlinking equipment type:', error);
    return res.status(500).json({ error: 'Internal server error.' });
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

router.delete("/:ID", (req, res) => {
    
});


module.exports = router;
