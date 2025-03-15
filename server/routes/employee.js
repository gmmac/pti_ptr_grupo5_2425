const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');

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
		console.log(req.body);
		const { nic, nif, storeNIPC, birthDate, gender, name, email, phone, role } = req.body


		const existingEmployee = await models.Employee.findOne({
			where: {
				[Op.or]: [
					{ nic: nic },
					{ nif: nif },
					{ phone: phone },
					{ email: email }
				]
			}
		});

		if (existingEmployee) {
			let errorTag = "";
			if (existingEmployee.nic == nic) {
				errorTag = "nic"
			} else if (existingEmployee.nif == nif) {
				errorTag = "nif"
			} else if (existingEmployee.phone == phone) {
				errorTag = "phone"
			}else if (existingEmployee.email == email) {
				errorTag = "email"
			}

			return res.status(200).json({ errorTag: errorTag});
		}

		console.log("DSDSDSDSD")


		const employee = await models.Employee.create({ /* Adicionar autoincrement no internNum */ 
			nic:nic,
            nif:nif,
            storeNIPC:storeNIPC,
            birthDate:birthDate,
            gender:gender,
            name:name,
            email:email,
            phone:phone,
            role:role,
			createdAt: Date.now(),
			updatedAt: Date.now()
		});

		res.status(201).json(employee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
