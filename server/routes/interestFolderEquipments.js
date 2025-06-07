const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

module.exports = router;
