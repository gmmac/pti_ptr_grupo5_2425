const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");


router.get("/", async (req, res) => {
	try {
		const {
			nic,
			firstName,
			lastName,
			email,
			phone,
			page = 1,
			pageSize = 10,
			orderBy,
			orderDirection,
		} = req.query;


		console.log(req.query)
		const where = {};

		if (nic) where.nic = { [Op.like]: `${nic}%` };
		if (firstName) where.firstName = { [Op.like]: `%${firstName}%` };
		if (lastName) where.lastName = { [Op.like]: `%${lastName}%` };
		if (email) where.email = { [Op.like]: `%${email}%` };
		if (phone) where.phone = { [Op.like]: `%${phone}%` };

		const offset = (parseInt(page) - 1) * parseInt(pageSize);

		let order = [];
		if (orderBy && orderDirection) {
			order = [[orderBy, orderDirection.toUpperCase()]];
		} else {
			order = [["nic", "ASC"]];
		}

		const { count, rows } = await models.Client.findAndCountAll({
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
		console.error("Error fetching clients:", error);
		res.status(500).json({ error: "Error fetching clients." });
	}
});

router.get("/:NIC", async (req, res) => {
	try {
		const client = await models.Client.findByPk(req.params.NIC);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}
		res.json(client);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:NIC", async (req, res) => {
	try {
		const client = await models.Client.findByPk(req.params.NIC);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}
		await client.update(req.body);
		res.json(client);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:NIC", async (req, res) => {
	try {
		const client = await models.Client.findByPk(req.params.NIC);
		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}
		await client.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {

	console.log(req.body)
	
	try {
		const client = await models.Client.create(req.body);
		res.status(201).json(client);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
	try {
		const {
			nic,
			nif,
			birthDate,
			gender,
			firstName,
			lastName,
			email,
			phone,
			adress,
			latitude,
			longitude,
		} = req.body;

		const existingClient = await models.Client.findOne({
			where: {
				[Op.or]: [
					{ nic: nic },
					{ nif: nif },
					{ phone: phone },
					{ email: email },
				],
			},
		});

		if (existingClient) {
			let errorTag = "";
			if (existingClient.nic == nic) {
				errorTag = "nic";
			} else if (existingClient.nif == nif) {
				errorTag = "nif";
			} else if (existingClient.phone == phone) {
				errorTag = "phone";
			} else if (existingClient.email == email) {
				errorTag = "email";
			}
			return res.status(200).json({ errorTag: errorTag });
		}

		const client = await models.Client.create({
			nic,
			nif,
			birthDate,
			gender,
			firstName,
			lastName,
			email,
			phone,
			adress,
			latitude,
			longitude,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		res.status(201).json(client);
	} catch (error) {
		console.log(error);
		res.status(400);
	}
});

module.exports = router;
