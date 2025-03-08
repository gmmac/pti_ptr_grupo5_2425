const express = require('express');
const router = express.Router();
const models = require('../models')
const { Op } = require('sequelize');

router.get("/:NIC", (req, res) => {

});

router.put("/:NIC", (req, res) => {

});

router.delete("/:NIC", (req, res) => {

});

router.post("/", async (req, res) => {
    try{
        const { nic, nif, birthDate, gender, name, email, phone, adress, latitude, longitude} = req.body;

        const existingClient = await models.Client.findOne({
            where: {
                [Op.or]: [
                    { nic: nic },
                    { nif: nif },
                    { phone: phone },
                    { email: email }
                ]
            }
        });

        if (existingClient) {
            let errorTag = "";
            if (existingClient.nic == nic) {
                errorTag = "nic"
            } else if (existingClient.nif == nif) {
                errorTag = "nif"
            } else if (existingClient.phone == phone) {
                errorTag = "phone"
            }else if (existingClient.email == email) {
                errorTag = "email"
            }
            return res.status(200).json({ errorTag: errorTag});
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
        console.log(error)
        res.status(400);
    }
});


module.exports = router;
