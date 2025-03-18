const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/:internNum", async (req, res) => {
	try {

		const employee = await models.Employee.findOne({
			where: { internNum: req.params.internNum },
		});

		if (!employee) {
			return res.status(404).json({ error: "Employee not found" });
		}
		res.json(employee);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:internNum", async (req, res) => {
	try {

		const employee = await models.Employee.findOne({
			where: { internNum: req.params.internNum },
		});
		
		if (!employee) {
			return res.status(404).json({ error: "Employee not found" });
		}
		await employee.update(req.body);
		res.json(employee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:internNum", async (req, res) => {
	try {
		
		const employee = await models.Employee.findOne({
			where: { internNum: req.params.internNum },
		});
		
		if (!employee) {
			return res.status(404).json({ error: "Employee not found" });
		}
		await employee.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		console.log(req.body)

		// nic: '',
		// nif: '',
		// internNum: '',
		// storeNIPC: '',
		// birthDate: '',
		// gender: '',
		// name: '',
		// email: '',
		// phone: '',
		// role: '',

		const employee = await models.Employee.create({
			nic: req.body.nic,
            nif: req.body.nif,
            internNum: req.body.internNum,
            storeNIPC: req.body.storeNIPC,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
			createdAt: Date.now(),
			updatedAt: Date.now()
		});
		res.status(201).json(employee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
