const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const {
      id,
      projectName,
      status,
      warehouse,
      organizerName,
      startDate,
      completionDate,
      page = 1,
      pageSize = 5,
    } = req.query;

    // build “where” for CharityProject fields
    const where = {};
    if (id) {
      where.id = { [Op.eq]: parseInt(id, 10) };
    }
    if (projectName) {
      where.name = { [Op.iLike]: `%${projectName}%` };
    }
    if (startDate) {
      where.startDate = { [Op.gte]: startDate };
    }
    if (completionDate) {
      where.completionDate = { [Op.lte]: completionDate };
    }

    // build include‐level filters
    const statusFilter = {};
    if (status) {
      statusFilter.state = { [Op.iLike]: `%${status}%` };
    }

    const warehouseFilter = {};
    if (warehouse) {
      warehouseFilter.name = { [Op.iLike]: `%${warehouse}%` };
    }

    // for organizer name, concatenate firstName + lastName
    const organizerWhere = organizerName
      ? Sequelize.where(
          Sequelize.fn(
            'concat',
            Sequelize.col('Organizer.firstName'),
            ' ',
            Sequelize.col('Organizer.lastName')
          ),
          { [Op.iLike]: `%${organizerName}%` }
        )
      : null;

    const offset = (Number(page) - 1) * Number(pageSize);

    const { count, rows } = await models.CharityProject.findAndCountAll({
      where,
      include: [
        {
          model: models.ProjectStatus,
          attributes: ['id', 'state'],
          where: statusFilter,
        },
        {
          model: models.Warehouse,
          attributes: ['id', 'name'],
          where: warehouseFilter,
        },
        {
          model: models.Organizer,
          attributes: ['nic', 'firstName', 'lastName', 'email'],
          // apply organizerName filter if present
          ...(organizerWhere ? { where: organizerWhere } : {}),
        },
      ],
      limit: Number(pageSize),
      offset,
      order: [['id', 'ASC']],  // or pull from req.query if you still want ordering
    });

    return res.json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: Number(page),
      pageSize: Number(pageSize),
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching charity projects:', error);
    return res.status(500).json({ error: 'Error fetching charity projects.' });
  }
});

router.get("/displayTable", async (req, res) => {
  try {
  const {
    id,
    startDate,
    completionDate,
    status,
    projectName,
    warehouse,
    organizerName,
	  createdAt,
    totalSpace,
    page = 1,
    pageSize = 10,
    sortField = "id",
    sortOrder = "ASC",
  } = req.query;


  const where = {};
  const warehouseCondition = {};
  const statusCondition = {};

  if (id)
    where.id = sequelize.where(
    sequelize.cast(sequelize.col("CharityProject.id"), "varchar"),
    { [Op.iLike]: `${id}%` }
    );

  if (totalSpace) where.totalSpace = { [Op.eq]: totalSpace };
  if (startDate) where.startDate = { [Op.lte]: startDate };
  if (completionDate) where.completionDate = { [Op.gte]: completionDate };
  if (status) statusCondition.state = { [Op.like]: `%${status}%` };
  if (warehouse) warehouseCondition.name = { [Op.like]: `%${warehouse}%` };
  if (projectName) where.name = { [Op.like]: `%${projectName}%` };

  if (organizerName) {
    where[Op.and] = Sequelize.where(
      Sequelize.fn(
      'concat',
      Sequelize.col('firstName'),
      ' ',
      Sequelize.col('lastName')
      ),
      {
      [Op.iLike]: `%${organizerName}%`
      }
    );
    }
    
  if (createdAt) {
    where.createdAt = {
    [Op.gte]: new Date(createdAt),
    [Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
    };
  }

  const offset = (parseInt(page) - 1) * parseInt(pageSize);

  const orderClause = [];

  if (sortField === "name") {
    orderClause.push([
    Sequelize.fn("LOWER", Sequelize.col("CharityProject.id")),
    sortOrder == -1 ? "DESC" : "ASC",
    ]);
  } else if (sortField) {
    orderClause.push([
    Sequelize.col(sortField),
    sortOrder == -1 ? "DESC" : "ASC",
    ]);
  }


  const { count, rows } = await models.CharityProject.findAndCountAll({
    where,
    include: [
      {
        model: models.ProjectStatus,
        attributes: ["id", "state"],
        where: statusCondition
      },
      {
        model: models.Warehouse,
        attributes: ["id", "name"],
        where: warehouseCondition
      },
      {
        model: models.Organizer,
        attributes: ["nic", "firstName", "lastName", "email"],
      },
    ],
    limit: parseInt(pageSize),
    offset,
    order: orderClause,
  });


  const formattedData = rows.map((item) => ({
    id: item.id,
    name: item.name,
    organizerName: item.Organizer.firstName + " " + item.Organizer.lastName,
    status: item.ProjectStatus.state,
    statusID: item.ProjectStatus.id,
    // totalSpace: item.totalSpace,
    warehouse: item.Warehouse.name,
    warehouseID: item.Warehouse.id,
    startDate: item.startDate,
    completionDate: item.completionDate
  }));

  res.status(200).json({
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: parseInt(page),
    pageSize: parseInt(pageSize),
    data: formattedData,
  });

  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error fetching brands." });
  }
});


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
    const { charityProjectId, items } = req.body;

    if (!charityProjectId || !Array.isArray(items)) {
      return res.status(400).json({ error: "charityProjectId and items[] are required." });
    }

    // Busca projeto + warehouse
    const charityProject = await models.CharityProject.findByPk(charityProjectId, {
      include: {
        model: models.Warehouse,
        attributes: ['availableSlots']
      }
    });

    if (!charityProject) {
      return res.status(404).json({ error: "Charity project not found." });
    }

    const availableSlots = charityProject.Warehouse?.availableSlots;
    if (availableSlots == null) {
      return res.status(400).json({ error: "Warehouse available slots not defined." });
    }

    // Busca os registros atuais
    const existingRecords = await models.CharityProjectEquipmentType.findAll({
      where: { charityProjectId }
    });

    // Mapas para facilitar comparações
    const existingMap = new Map();
    let totalAtual = 0;
    
    for (const record of existingRecords) {
      existingMap.set(record.equipmentTypeId, record.quantity);
      totalAtual += record.quantity;
    }


    // Calcular a soma final após update
    let totalFinal = totalAtual;


    for (const item of items) {
      const quantity = item.quantity || 1;
      const existingQty = existingMap.get(item.id) || 0;

      // Subtrai o antigo (se houver) e adiciona o novo
      totalFinal = totalFinal - existingQty + quantity;
    }


    
    // Verifica se cabe no espaço disponível
    if (totalFinal > availableSlots) {
      console.error(`Not enough available slots in warehouse. Requested total: ${totalFinal}, Available: ${availableSlots}`)
      return res.status(400).json({
        error: `Not enough available slots in warehouse. Requested total: ${totalFinal}, Available: ${availableSlots}`
      });
    }

    // Atualiza os dados: remove todos os registros antigos e insere os novos
    await models.CharityProjectEquipmentType.destroy({
      where: { charityProjectId }
    });

    const records = items.map(({ id, quantity }) => ({
      charityProjectId,
      equipmentTypeId: id,
      quantity: quantity || 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const created = await models.CharityProjectEquipmentType.bulkCreate(records);

    res.status(201).json({
      message: "Equipment types updated successfully.",
      insertedCount: created.length,
      data: created
    });

  } catch (error) {
    console.error("Error updating equipment types:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.post("/linkEquipmentSheet", async (req, res) => {
  try {
    const { charityProjectId, items } = req.body;

    if (!charityProjectId || !Array.isArray(items)) {
      return res.status(400).json({ error: "charityProjectId and items[] are required." });
    }

    // Busca projeto + warehouse
    const charityProject = await models.CharityProject.findByPk(charityProjectId, {
      include: {
        model: models.Warehouse,
        attributes: ['availableSlots']
      }
    });

    if (!charityProject) {
      return res.status(404).json({ error: "Charity project not found." });
    }

    const availableSlots = charityProject.Warehouse?.availableSlots;
    if (availableSlots == null) {
      return res.status(400).json({ error: "Warehouse available slots not defined." });
    }

    // Busca os registros atuais
    const existingRecords = await models.EquipmentSheetCharityProject.findAll({
      where: { charityProjectId }
    });

    const existingMap = new Map();
    let totalAtual = 0;

    for (const record of existingRecords) {
      existingMap.set(record.equipmentSheetId, record.quantity);
      totalAtual += record.quantity;
    }

    // Calcular novo total após atualização
    let totalFinal = totalAtual;

    for (const item of items) {
      const quantity = item.quantity || 1;
      const existingQty = existingMap.get(item.barcode) || 0;
      totalFinal = totalFinal - existingQty + quantity;
    }

    // Verifica se há espaço suficiente
    if (totalFinal > availableSlots) {
      return res.status(400).json({
        error: `Not enough available slots in warehouse. Requested total: ${totalFinal}, Available: ${availableSlots}`
      });
    }

    // Atualiza: remove todos os registros e insere os novos
    await models.EquipmentSheetCharityProject.destroy({
      where: { charityProjectId }
    });

    const records = items.map(({ barcode, quantity }) => ({
      charityProjectId,
      equipmentSheetId: barcode,
      quantity: quantity || 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const created = await models.EquipmentSheetCharityProject.bulkCreate(records);

    res.status(201).json({
      message: "Equipment sheets linked successfully.",
      insertedCount: created.length,
      data: created
    });

  } catch (error) {
    console.error("Error linking equipment sheets:", error);
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

    const offset = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);
    const limit  = parseInt(pageSize, 10);

    // 1) valida projeto
    const project = await models.CharityProject.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Charity Project not found." });
    }

    // 2) metas por tipo
    const linkedRecords = await models.CharityProjectEquipmentType.findAll({
      where: { charityProjectId: id },
      attributes: ['equipmentTypeId', 'quantity']
    });
    const idToQtyMap = linkedRecords.reduce((acc, rec) => {
      acc[rec.equipmentTypeId] = rec.quantity || 1;
      return acc;
    }, {});
    const equipmentTypeIds = Object.keys(idToQtyMap);

    // 3) conta doações por tipo, só barcode + COUNT(*)
    const donationCountsRaw = await models.CharityProjectDonations.findAll({
      where: { charityProjectId: id },
      include: [{
        model: models.UsedEquipment,
        attributes: [],
        include: [{
          model: models.EquipmentSheet,
          attributes: [],
          include: [{
            model: models.EquipmentType,
            where: { id: equipmentTypeIds },
            attributes: []
          }]
        }]
      }],
      attributes: [
        [Sequelize.col('UsedEquipment.EquipmentSheet.EquipmentType.id'), 'equipmentTypeId'],
        [Sequelize.fn('COUNT', Sequelize.literal('*')),              'count']
      ],
      group: ['UsedEquipment.EquipmentSheet.EquipmentType.id'],
      raw: true
    });
    const donationCountsMap = donationCountsRaw.reduce((acc, row) => {
      acc[row.equipmentTypeId] = parseInt(row.count, 10);
      return acc;
    }, {});

    // 4) busca dados de EquipmentType
    const { count, rows } = await models.EquipmentType.findAndCountAll({
      where: {
        id:   equipmentTypeIds,
        name: { [Op.iLike]: `%${name}%` }
      },
      order: [[orderBy, orderDirection.toUpperCase()]],
      offset,
      limit
    });

    // 5) formata saída incluindo currentDonations e quantidade meta
    const formatted = rows.map(type => ({
      id:               type.id,
      name:             type.name,
      quantity:         idToQtyMap[type.id] || 1,
      currentDonations: donationCountsMap[type.id] || 0
    }));

    return res.json({
      totalItems:  count,
      totalPages:  Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      pageSize:    limit,
      data:        formatted
    });

  } catch (error) {
    console.error("Erro ao buscar tipos vinculados ao projeto:", error);
    return res.status(500).json({ error: "Erro ao buscar tipos vinculados ao projeto." });
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

    const offset = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);
    const limit  = parseInt(pageSize, 10);

    // 1) valida projeto
    const project = await models.CharityProject.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Charity Project not found." });
    }

    // 2) metas por sheet
    const linkedRecords = await models.EquipmentSheetCharityProject.findAll({
      where: { charityProjectId: id },
      attributes: ['equipmentSheetId', 'quantity']
    });
    const idToQtyMap = linkedRecords.reduce((acc, rec) => {
      acc[rec.equipmentSheetId] = rec.quantity || 1;
      return acc;
    }, {});
    const equipmentSheetIds = Object.keys(idToQtyMap);

    // 3) conta doações por barcode usando COUNT(*)
    const donationCountsRaw = await models.CharityProjectDonations.findAll({
      where: { charityProjectId: id },
      include: [{
        model: models.UsedEquipment,
        attributes: [],
        include: [{
          model: models.EquipmentSheet,
          where: { barcode: equipmentSheetIds },
          attributes: [] 
        }]
      }],
      attributes: [
        [Sequelize.col('UsedEquipment.EquipmentSheet.barcode'), 'barcode'],
        [Sequelize.fn('COUNT', Sequelize.literal('*')),    'count']
      ],
      group: ['UsedEquipment.EquipmentSheet.barcode'],
      raw: true
    });
    const donationCountsMap = donationCountsRaw.reduce((acc, row) => {
      acc[row.barcode] = parseInt(row.count, 10);
      return acc;
    }, {});

    // 4) busca dados dos sheets
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
          include: [{ model: models.Brand, attributes: ['id', 'name'] }]
        },
        { model: models.EquipmentType, attributes: ['id', 'name'] }
      ],
      order: [[orderBy, orderDirection.toUpperCase()]],
      offset,
      limit
    });

    // 5) formata resposta incluindo currentDonations
    const formattedRows = rows.map(item => ({
      Barcode:         item.barcode,
      CreatedAt:       item.createdAt,
      UpdatedAt:       item.updatedAt,
      EquipmentModel:  { id: item.EquipmentModel.id, name: item.EquipmentModel.name },
      Brand:           { id: item.EquipmentModel.Brand.id, name: item.EquipmentModel.Brand.name },
      EquipmentType:   { id: item.EquipmentType.id, name: item.EquipmentType.name },
      quantity:        idToQtyMap[item.barcode] || 1,
      currentDonations: donationCountsMap[item.barcode] || 0
    }));

    res.json({
      totalItems:  count,
      totalPages:  Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      pageSize:    limit,
      data:        formattedRows
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
    // 1) Load the project
    const project = await models.CharityProject.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // 2) If warehouseID is changing, enforce slot logic
    if (warehouseID && Number(warehouseID) !== project.warehouseID) {
      // how many donations this project already has
      const donationCount = await models.CharityProjectDonations.count({
        where: { charityProjectId: projectId }
      });


      // load both old & new warehouses
      const oldWh = await models.Warehouse.findByPk(project.warehouseID);
      const newWh = await models.Warehouse.findByPk(warehouseID);


      if (!newWh) {
        return res.status(404).json({ error: 'New warehouse not found.' });
      }
      // check capacity
      if (newWh.availableSlots < donationCount) {
        return res
          .status(400)
          .json({ error: 'Not enough available slots in the selected warehouse.' });
      }

      // return slots to old warehouse
      if (oldWh) {
        await oldWh.increment('availableSlots', { by: donationCount });
      }

      // take slots from new warehouse
      await newWh.decrement('availableSlots', { by: donationCount });

      // apply the change
      project.warehouseID = Number(warehouseID);
    }

    // 3) Update other fields
    project.name           = name           ?? project.name;
    project.startDate      = startDate      ?? project.startDate;
    project.completionDate = completionDate ?? project.completionDate;
    project.status         = statusID       ?? project.status;

    await project.save();

    return res
      .status(200)
      .json({ message: 'Project updated successfully', data: project });
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
