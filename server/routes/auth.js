const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const router = express.Router();

router.post("/generateAuthToken", async (req, res) => {
  try {
    // Request an access token from Auth0
    const response = await axios.post(process.env.AUTH0_API_URL + "/oauth/token", {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_API_URL + "/api/v2/",
      grant_type: "client_credentials",
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.access_token;
    const encryptedToken = CryptoJS.AES.encrypt(token, process.env.CIPHER_SECRET_KEY).toString();

    // Set an HTTP-only cookie to store the encrypted token
    res.cookie("attk", encryptedToken, {
      httpOnly: true, // Prevents access via JavaScript in the browser
      sameSite: "Strict", // Protects against CSRF attacks
      maxAge: 86400000 , // Cookie lifespan (24 hours)
    });

    // Send a success response
    res.sendStatus(201);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;