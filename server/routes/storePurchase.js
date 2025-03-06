const express = require('express');
const router = express.Router();
const models = require('../models');

router.post("/", async (req, res) => {
    const { status, price, equipmentId, purchaseDate } = req.body;
    

    if (!status || !price || !equipmentId || !purchaseDate) { 
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        // Query para inserir na tabela StorePurchases
        await db.query(
            'INSERT INTO StorePurchases (storeID, clientNIC, employeeID, purchasePrice, usedEquipmentID) VALUES (123456789, 123456789, 123456789, ?, ?)',
            [price, equipmentId]
        );

        // Query para inserir na tabela UsedEquipments
        await db.query(
            'INSERT INTO UsedEquipments (statusID, price, saleDate, purchaseDate, equipmentId) VALUES (?, ?, null, ?, ?)',
            [status, price, purchaseDate, equipmentId] 
        );

        res.status(201).json({ message: "Venda registada com sucesso!" });
    } catch (error) {
        console.error("Erro ao registar venda:", error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

module.exports = router;
