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
			// adress,
			// latitude,
			// longitude,
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
			// adress,
			// latitude,
			// longitude,
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

router.put("/:NIC", (req, res) => {

});

router.delete("/:NIC", (req, res) => {
    
});


module.exports = router;
