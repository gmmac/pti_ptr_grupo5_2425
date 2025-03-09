const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	try {
		const client = await models.Client.findAll();
		if (!client) {
			return res.status(404).json({ error: "Clients not found" });
		}
		res.json(client);
	} catch (error) {
		res.status(500).json({ error: error.message });
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
	try {
		const {
			nic,
			nif,
			birthDate,
			gender,
			name,
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
			name,
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
