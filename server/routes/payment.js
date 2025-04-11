const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const models = require('../models');
require("dotenv").config();
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.get("/config", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});


router.post("/create-payment-intent", async (req, res) => {
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
        currency: "eur",
        amount: 1999,
        automatic_payment_methods: {
            enabled: true,
        },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
        return res.status(400).send({
        error: {
            message: e.message,
        },
        });
    }
});

  




module.exports = router;
