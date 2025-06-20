const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const models = require("../models");
require("dotenv").config();
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/config", (req, res) => {
	res.status(200).send({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

router.post("/create-payment-intent", async (req, res) => {
	// try {
	const { totalPrice } = req.body;

	if (!totalPrice || isNaN(totalPrice)) {
		return res
			.status(400)
			.send({ error: { message: "totalPrice invalid or not given." } });
	}

	// Stripe espera amount em cêntimos (inteiro)
	const amountInCents = Math.round(totalPrice * 100);

	const paymentIntent = await stripe.paymentIntents.create({
		currency: "eur",
		amount: amountInCents,
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.status(200).send({ clientSecret: paymentIntent.client_secret });
	// } catch (e) {
	// 	return res.status(400).send({
	// 		error: {
	// 			message: e.message,
	// 		},
	// 	});
	// }
});

module.exports = router;
