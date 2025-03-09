const express = require("express");
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize'); // Certifique-se de importar o operador Op

// filtro e paginação da interestFolder
http://localhost:4005/api/interestsFolder/?name=&clientNIC=&orderBy=createdAt&orderDirection=ASC&page=2&pageSize=3
router.get("/", async (req, res) => {
  try {
    const { name, clientNIC, page = 1, pageSize = 10, orderBy, orderDirection } = req.query;
    const where = {};
    
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    const clientCondition = clientNIC ? { nic: clientNIC } : {};
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let order = [];
    if (orderBy && orderDirection) {
      order = [[orderBy, orderDirection.toUpperCase()]];
    } else {
      order = [["createdAt", "DESC"]];
    }

    console.log("Order applied:", order);

    const { count, rows } = await models.FolderInterest.findAndCountAll({
      where,
      attributes: {
        exclude: ["clientNIC"],
      },
      include: [
        {
          model: models.Client,
          as: "client",
          where: clientCondition,
          attributes: ["nic", "name"],
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
    console.error("Error fetching interest folders:", error);
    res.status(500).json({ error: "Error fetching interest folders." });
  }
});



router.post("/", async (req, res) => {
    try {
      console.log(req.body)
        const { name, clientNIC } = req.body;
        const folder = await models.FolderInterest.create({
          name, 
          clientNIC,
          createdAt: new Date(),
          updatedAt: new Date(),
      });
        res.status(201).json(folder);
    } catch (error) {
        res.status(400).json({ error: "Error creating interest folder." });
    }
});



// router.get("/filter", async (req, res) => {
//     try {

//       const { name, clientNIC, page, pageSize, orderBy = "createdAt", orderDirection = "DESC" } = req.query;

//       const where = {};
//       if (name) {
//         where.name = {
//           [Op.like]: `%${name}%`
//         };
//       }
//       const clientCondition = clientNIC ? { nic: clientNIC } : {};
//       const offset = (parseInt(page) - 1) * parseInt(pageSize);
  
//       const { count, rows } = await models.FolderInterest.findAndCountAll({
//         where, // Filtro aplicado
//         attributes: {
//           exclude: ['clientNIC'], // Exclui a coluna clientNIC
//         },
//         include: [
//           "interests", // Associa a tabela de interesses
//           {
//             model: models.Client,
//             as: "client",
//             where: clientCondition, // Filtro pelo clientNIC
//           },
//         ],
//         limit: parseInt(pageSize),
//         offset: offset,
//         order: [[orderBy, orderDirection]], // Ordenação
//       });
  
//       res.json({
//         totalItems: count,
//         totalPages: Math.ceil(count / pageSize),
//         currentPage: page,
//         pageSize,
//         data: rows,
//       });
  
//     } catch (error) {
//       console.error(error); // Registra o erro no console para depuração
//       res.status(500).json({ error: "Error fetching interest folders." });
//     }
//   });
  

router.get("/:id", async (req, res) => {

    try {
        const folder = await models.FolderInterest.findByPk(req.params.id, { include: "interests" });
        if (!folder) return res.status(404).json({ error: "Interest folder not found." });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: "Error fetching interest folder." });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, clientNIC } = req.body;
        const folder = await models.FolderInterest.findByPk(req.params.id);
        if (!folder) return res.status(404).json({ error: "Interest folder not found." });
        
        await folder.update({ name, clientNIC });
        res.json(folder);
    } catch (error) {
        res.status(400).json({ error: "Error updating interest folder." });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const folder = await models.FolderInterest.findByPk(req.params.id);
        if (!folder) return res.status(404).json({ error: "Interest folder not found." });
        
        await folder.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error deleting interest folder." });
    }
});


module.exports = router;