const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/index");

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
            active = "1",
            page = 1,
            pageSize = 5,
            orderBy = "internNum",
            orderDirection = "ASC",
        } = req.query;


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
        if (active) where.isActive = { [Op.eq]: active };

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
				include: ["passwordReseted", "isActive"]
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


router.get("/displayTable", async (req, res) => {
  try {
	const {
	  internNum,
	  employeeName,
	  store,
	  email,
	  phone,
	  role,
	  createdAt,
	  page = 1,
	  pageSize = 5,
	  sortField = "internNum",
	  sortOrder = "ASC",
	} = req.query;


	const where = {};
	const roleCondition =  {};
	const storeCondition = {}

	if (internNum)
	  where.internNum = sequelize.where(
		sequelize.cast(sequelize.col("Employee.internNum"), "varchar"),
		{ [Op.iLike]: `${internNum}%` }
	  );

	if (store) storeCondition.name = { [Op.iLike]: `%${store}%` };

	if (employeeName) {
		where[Op.and] = Sequelize.where(
		  Sequelize.fn(
			'concat',
			Sequelize.col('firstName'),
			' ',
			Sequelize.col('lastName')
		  ),
		  {
			[Op.iLike]: `%${employeeName}%`
		  }
		);
	  }
	  
	if (email) where.email = { [Op.iLike]: `%${email}%` };
	if (phone) where.phone = { [Op.iLike]: `${phone}%` };

	if (role) roleCondition.role = { [Op.iLike]: `%${role}%` };

	if(req.query.isActive) where.isActive = {[Op.eq]: req.query.isActive}


	if (createdAt) {
	  where.createdAt = {
		[Op.gte]: new Date(createdAt),
		[Op.lt]: new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000),
	  };
	}

	const offset = (parseInt(page) - 1) * parseInt(pageSize);

	const orderClause = [];

	if (sortField === "employeeName") {
	orderClause.push(["firstName", sortOrder == -1 ? "DESC" : "ASC"]);
	orderClause.push(["lastName", sortOrder == -1 ? "DESC" : "ASC"]);
	} else if (sortField === "roleName") {
	orderClause.push([
		{ model: models.EmployeeRole },
		"role",
		sortOrder == -1 ? "DESC" : "ASC"
	]);
	} else if (sortField === "storeName") {
	orderClause.push([
		{ model: models.Store },
		"name",
		sortOrder == -1 ? "DESC" : "ASC"
	]);
	} else {
	orderClause.push([
		sortField,
		sortOrder == -1 ? "DESC" : "ASC"
	]);
	}




	const { count, rows } = await models.Employee.findAndCountAll({
	  where,
		include: [
		{
			model: models.EmployeeRole,
			attributes: ["id", "role"],
			where: roleCondition
		},
		{
			model: models.Store,
			attributes: ["nipc", "name"],
			where: storeCondition
		}   
		],
	  limit: parseInt(pageSize),
	  offset,
	  order: orderClause,
	});


	const formattedData = rows.map((item) => ({
		internNum: item.internNum,
		employeeName: item.firstName + " " + item.lastName,
		// lastName: item.lastName,
		email: item.email,
		phone: item.phone,
		storeNIPC: item.storeNIPC,
		storeName: item.Store.name,
		roleId: item.EmployeeRole.id,
		roleName: item.EmployeeRole.role,
		isActive: item.isActive
	}));

	res.status(200).json({
	  totalItems: count,
	  totalPages: Math.ceil(count / pageSize),
	  currentPage: parseInt(page),
	  pageSize: parseInt(pageSize),
	  data: formattedData,
	});

  } catch (error) {
	console.log(error);
	res.status(500).json({ error: "Error fetching brands." });
  }
});


router.post("/", async (req, res) => {
	try {
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
			isActive: 1,
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

		const currentEmployee = req.cookies.employeeInfo;
		if (currentEmployee && currentEmployee.internNum == req.params.internNum) {
			res.cookie("employeeInfo", employee.dataValues, {
				httpOnly: true,
				secure: false,
				sameSite: "Lax",
				maxAge: 24 * 60 * 60 * 1000, // 1 dia
			});
		}

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

router.patch("/activation/:internNum", async (req, res) => {
	try {
		const employee = await models.Employee.findOne({
			where: { internNum: req.params.internNum },
		});

		if (!employee) {
			return res.status(404).json({ error: "Funcionário não encontrado." });
		}

		// toggle isActive attribute
		employee.isActive = employee.isActive === "1" ? "0" : "1";
		await employee.save();

		const statusText = employee.isActive === 1 ? "active" : "inative";

		const currentEmployee = req.cookies.employeeInfo;
		if (currentEmployee && currentEmployee.internNum === req.params.internNum) {
			res.cookie("employeeInfo", employee.dataValues, {
				httpOnly: true,
				secure: false,
				sameSite: "Lax",
				maxAge: 24 * 60 * 60 * 1000, // 1 dia
			});
		}

		res.status(200).json({
			message: `Funcionário ${statusText} com sucesso.`,
			employee,
		});
	} catch (error) {
		console.error("Erro ao alternar isActive:", error);
		res.status(500).json({ error: "Erro ao atualizar o status do funcionário." });
	}
});


module.exports = router;