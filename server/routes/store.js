const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require('sequelize');


router.get("/", async (req, res) => {
	try {
		const {
			nipc,
			name,
			email,
			phone,
			openTime,
			closeTime,
			address,
			latitude,
			longitude,
			page = 1,
			pageSize = 5,
			orderBy,
			orderDirection,
		} = req.query;

		const where = {};

		if (nipc) where.nipc = { [Op.like]: `${nipc}%` };
		if (name) where.name = { [Op.like]: `%${name}%` };
		if (email) where.email = { [Op.like]: `%${email}%` };
		if (phone) where.phone = { [Op.like]: `%${phone}%` };
		//   if (openTime) where.openTime = { [Op.eq]: parseInt(openTime) };
		//   if (closeTime) where.closeTime = { [Op.eq]: parseInt(closeTime) };
		if (address) where.address = { [Op.like]: `%${address}%` };
		//   if (latitude) where.latitude = { [Op.like]: `%${latitude}%` };
		//   if (longitude) where.longitude = { [Op.like]: `%${longitude}%` };

		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		let order = [];
		if (orderBy && orderDirection) {
			order = [[orderBy, orderDirection.toUpperCase()]];
		} else {
			order = [["nipc", "ASC"]];
		}

		//   console.log("Order applied:", order);

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


router.get('/displayTable', async (req, res) => {
  try {
	const {
	  nipc,
	  name,
	  email,
	  phone,
	  openTime,
	  closeTime,
	  address,
	  isActive = '1',
	  page = 1,
	  pageSize = 5,
	  sortField = 'nipc',
	  sortOrder = 'ASC'
	} = req.query;

	const where = { isActive: { [Op.like]: isActive } };
	if (nipc) {
	  where.nipc = Sequelize.where(
		Sequelize.cast(Sequelize.col('Store.nipc'), 'varchar'),
		{ [Op.iLike]: `${nipc}%` }
	  );
	}

	if (name) where.name = { [Op.iLike]: `%${name}%` };
	if (email) where.email = { [Op.iLike]: `%${email}%` };
	if (phone) where.phone = { [Op.iLike]: `${phone}%` };
	if (address) where.address = { [Op.iLike]: `%${address}%` };

	const limit = parseInt(pageSize, 10);
	const offset = (parseInt(page, 10) - 1) * limit;
	// const order = [[Sequelize.col(sortField), sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];

	const order = [];

    if (sortField === "name") {
      order.push([
        Sequelize.fn("LOWER", Sequelize.col("Store.name")),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    } else if (sortField) {
      order.push([
        Sequelize.col(sortField),
        sortOrder == -1 ? "DESC" : "ASC",
      ]);
    }


	const { count, rows } = await models.Store.findAndCountAll({ where, limit, offset, order });

	res.status(200).json({
	  totalItems: count,
	  totalPages: Math.ceil(count / limit),
	  currentPage: parseInt(page, 10),
	  pageSize: limit,
	  data: rows.map((s) => ({
		nipc: s.nipc,
		name: s.name,
		email: s.email,
		phone: s.phone,
		address: s.address,
		openTime: s.openTime,
		closeTime: s.closeTime,
		isActive: s.isActive
	  }))
	});
  } catch (error) {
	console.error('Error fetching warehouses:', error);
	res.status(500).json({ message: 'Error fetching warehouses.' });
  }
});



router.post('/', async (req, res) => {
  try {
    const {
      nipc,
      name,
      email,
      phone,
      openTime,
      closeTime,
      address,
      isActive
    } = req.body;

    if (!nipc || !/^\d{9}$/.test(nipc)) return res.status(400).json({ message: 'NIPC must have exactly 9 digits.' });
    if (!phone || !/^\d{9}$/.test(phone)) return res.status(400).json({ message: 'Phone must have exactly 9 digits.' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: 'Invalid email format.' });

	const existingByNipc = await models.Store.findOne({ where: { nipc } });
	if (existingByNipc) {
	return res.status(400).json({ message: 'NIPC already exists.' });
	}

	const existingByEmail = await models.Store.findOne({ where: { email } });
	if (existingByEmail) {
	return res.status(400).json({ message: 'Email already exists.' });
	}

	const existingByPhone = await models.Store.findOne({ where: { phone } });
	if (existingByPhone) {
	return res.status(400).json({ message: 'Phone number already exists.' });
	}

    const open = openTime?.slice(0, 5); // 'HH:mm'
    const close = closeTime?.slice(0, 5);
    if (open && close && open >= close) {
      return res.status(400).json({ message: 'Close time must be after open time.' });
    }

    const newStore = await models.Store.create({
      nipc,
      name,
      email,
      phone,
      openTime: open,
      closeTime: close,
      address,
      isActive: isActive || "1"
    });

    res.status(201).json(newStore);
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ message: 'Internal server error.' });
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

router.patch('/activation/:id', async (req, res) => {
  try {
    const store = await models.Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found.' });
    }

    store.isActive = store.isActive === '1' ? '0' : '1';
    await store.save();

    res.status(200).json(store);
  } catch (error) {
    console.error('Error toggling store activation:', error);
    res.status(500).json({ message: 'Error toggling store activation.' });
  }
});

module.exports = router;

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
