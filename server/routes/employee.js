const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require('sequelize');

router.get("/", async (req, res) => {
    try {
        const {
            nic,
            nif,
            internNum,
            storeNIPC,
            firstName,
            lastName,
            email,
            phone,
			gender,
            // address,
            role,
            page = 1,
            pageSize = 10,
            orderBy,
            orderDirection,
        } = req.query;


		console.log(req.query)
		console.log("SSDSD" + req.query.internNum)
        const where = {};

        if (nic) where.nic = { [Op.like]: `${nic}%` };
        if (nif) where.nif = { [Op.like]: `${nif}%` };
        if (internNum) where.internNum = { [Op.eq]: `${parseInt(internNum)}` };
        if (storeNIPC) where.storeNIPC = { [Op.eq]: storeNIPC };
        if (firstName) where.firstName = { [Op.like]: `%${firstName}%` };
        if (lastName) where.lastName = { [Op.like]: `%${lastName}%` };
        if (email) where.email = { [Op.like]: `%${email}%` };
        if (phone) where.phone = { [Op.like]: `%${phone}%` };
        if (gender) where.gender = { [Op.like]: `%${gender}%` };
        // if (address) where.address = { [Op.like]: `%${address}%` };
        if (role) where.role = { [Op.eq]: role };

        const offset = (parseInt(page) - 1) * parseInt(pageSize);

        let order = [];
        if (orderBy && orderDirection) {
            order = [[orderBy, orderDirection.toUpperCase()]];
        } else {
            order = [["nic", "ASC"]];
        }

        const { count, rows } = await models.Employee.findAndCountAll({
            where,
			attributes:{
				exclude: ["role", "storeNIPC"],
				include: ["passwordReseted"]
			},
			include: [
                {
                  model: models.EmployeeRole,
                  attributes: ["id", "role"],
                },                
				{
					model: models.Store,
					attributes: ["nipc", "name", "address"],
				  }
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
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Error fetching employees." });
    }
});



router.post("/", async (req, res) => {
	try {
		console.log(req.body);
		const { nic, nif, storeNIPC, birthDate, gender, firstName, lastName, email, phone, role } = req.body


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

		const employee = await models.Employee.create({ /* Adicionar autoincrement no internNum */ 
			nic:nic,
            nif:nif,
            storeNIPC:storeNIPC,
            birthDate:birthDate,
            gender:gender,
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone,
            role:role,
			passwordReseted: 0,
			createdAt: Date.now(),
			updatedAt: Date.now()
		});

		res.status(201).json(employee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});


router.get("/user-info", (req, res) => {
	const employeeInfo = req.cookies.employeeInfo;

	console.log(employeeInfo)

	return res.status(200).json({ employeeInfo: employeeInfo });
  });
  
router.get('/logout', (req, res) => {
	res.clearCookie("employeeInfo", {
	  httpOnly: true,
	  secure: false, // Deve bater com a flag usada na criação do cookie
	  sameSite: "Lax"
	});
  
	return res.status(200).json({ message: 'Logout realizado com sucesso.' });
});



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


module.exports = router;