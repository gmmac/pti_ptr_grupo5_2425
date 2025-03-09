const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
	try {
	  const { name, email, phone, page = 1, pageSize = 10, orderBy, orderDirection } = req.query;
	  const where = {};
  
	  if (name) {
		where.name = { [Op.like]: `%${name}%` };
	  }
	  if (email) {
		where.email = { [Op.like]: `%${email}%` };
	  }
	  if (phone) {
		where.phone = { [Op.like]: `%${phone}%` };
	  }
  
	  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  
	  let order = [];
	  if (orderBy && orderDirection) {
		order = [[orderBy, orderDirection.toUpperCase()]];
	  } else {
		order = [["createdAt", "DESC"]];
	  }
  
	  console.log("Order applied:", order);
  
	  const { count, rows } = await models.Store.findAndCountAll({
		where,
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
	  console.error("Error fetching stores:", error);
	  res.status(500).json({ error: "Error fetching stores." });
	}
  });

router.post("/", async (req, res) => {
	try {
		const store = await models.Store.create(req.body);
		res.status(201).json(store);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get("/:NIPC", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		res.json(store);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:NIPC", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		await store.update(req.body);
		res.json(store);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:NIPC", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		await store.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/:NIPC/employees", async (req, res) => {
	try {
		const store = await models.Store.findByPk(req.params.NIPC);
		if (!store) {
			return res.status(404).json({ error: "Store not found" });
		}
		const employees = await models.Employee.findAll({
			where: { storeNIPC: req.params.NIPC },
		});
		res.json(employees);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
