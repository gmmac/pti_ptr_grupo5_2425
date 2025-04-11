const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');

router.get("/", (req, res) => {

});

router.post("/", async (req, res) => {
	try {
		console.log(req.body);

		const {
			nic,
			nif,
			birthDate,
			gender,
			firstName,
			lastName,
			email,
			phone,
		} = req.body;

		// Verificar se o cliente já existe
		const existingOrganizer = await models.Organizer.findOne({
			where: {
				[Op.or]: [
					{ nic: nic },
					{ nif: nif },
					{ phone: phone },
					{ email: email },
				],
			},
		});

		if (existingOrganizer) {
			let errorTag = "";
			if (existingOrganizer.nic == nic) {
				errorTag = "nic";
			} else if (existingOrganizer.nif == nif) {
				errorTag = "nif";
			} else if (existingOrganizer.phone == phone) {
				errorTag = "phone";
			} else if (existingOrganizer.email == email) {
				errorTag = "email";
			}
			return res.status(200).json({ errorTag: errorTag }); // Retorna imediatamente para evitar múltiplas respostas
		}

		// Criar o cliente caso não exista
		const organizer = await models.Organizer.create({
			nic,
			nif,
			birthDate,
			gender,
			firstName,
			lastName,
			email,
			phone,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		res.status(201).json(organizer);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: error.message });
	}
});

router.get("/:NIC", (req, res) => {

});

router.put("/:NIC", async (req, res) => {
	try {
		const organizer = await models.Organizer.findByPk(req.params.NIC);
		if (!organizer) {
			return res.status(404).json({ error: "Organizer not found" });
		}

		await organizer.update(req.body);

		res.cookie("organizerInfo", organizer.dataValues, {
			httpOnly: true,
			secure: false,
			sameSite: "Lax",
			maxAge: 24 * 60 * 60 * 1000 // 1 dia
		});
		console.log(organizer)
		res.json(organizer);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:NIC", (req, res) => {
    
});


module.exports = router;
