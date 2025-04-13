// server.js

//Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4005; // usar .env?

// Componentes - Importando todas as rotas
const address = require("./routes/address");
const brand = require("./routes/brand");
const cart = require("./routes/cart");
const charityProject = require("./routes/charityProject");
const client = require("./routes/client");
const clientPurchase = require("./routes/clientPurchase");
const employee = require("./routes/employee");
const entity = require("./routes/entity");
const equipmentSheet = require("./routes/equipmentSheet");
const equipmentStatus = require("./routes/equipmentStatus");
const interest = require("./routes/interest");
const interestsFolder = require("./routes/interestsFolder");
const model = require("./routes/model");
const organizer = require("./routes/organizer");
const part = require("./routes/part");
const repair = require("./routes/repair");
const repairStatus = require("./routes/repairStatus");
const repairStatusLogs = require("./routes/repairStatusLogs");
const store = require("./routes/store");
const storePurchase = require("./routes/storePurchase");
const usedEquipment = require("./routes/usedEquipment");
const warehouse = require("./routes/warehouse");
const auth = require("./routes/auth");
const employeeRole = require("./routes/employeeRole");
const actualCart = require("./routes/actualCart");
const actualCartEquipment = require("./routes/actualCartEquipment");
const type = require("./routes/type");
const payment = require("./routes/payment");
const projectStatus = require("./routes/projectStatus");
const equipmentType = require("./routes/equipmentType");
const purchaseCartEquipment = require("./routes/purchaseCartEquipment");

// Definição de endpoints --> rotas
app.use("/api/address", address);
app.use("/api/brand", brand);
app.use("/api/cart", cart);
app.use("/api/charityProject", charityProject);
app.use("/api/client", client);
app.use("/api/clientPurchase", clientPurchase);
app.use("/api/employee", employee);
app.use("/api/entity", entity);
app.use("/api/equipmentSheet", equipmentSheet);
app.use("/api/equipmentStatus", equipmentStatus);
app.use("/api/interest", interest);
app.use("/api/interestsFolder", interestsFolder);
app.use("/api/model", model);
app.use("/api/organizer", organizer);
app.use("/api/part", part);
app.use("/api/repair", repair);
app.use("/api/repairStatus", repairStatus);
app.use("/api/repairStatusLogs", repairStatusLogs);
app.use("/api/store", store);
app.use("/api/storePurchase", storePurchase);
app.use("/api/usedEquipment", usedEquipment);
app.use("/api/warehouse", warehouse);
app.use("/api/auth", auth);
app.use("/api/employeeRole", employeeRole);
app.use("/api/actualCart", actualCart);
app.use("/api/actualCartEquipment", actualCartEquipment);
app.use("/api/type", type);
app.use("/api/payment", payment);
app.use("/api/projectStatus", projectStatus);
app.use("/api/equipmentType", equipmentType);
app.use("/api/purchaseCartEquipment", purchaseCartEquipment);

app.get("/status", (req, res) => {
	res.json({
		success: true,
	});
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
