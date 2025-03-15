const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const models = require('../models');
require("dotenv").config();
const router = express.Router();

// Function to encrypt the token
const encryptToken = (token) => {
  const encrypted = CryptoJS.AES.encrypt(token, process.env.CIPHER_SECRET_KEY).toString();
  return encrypted;
};

// Function to decrypt the token
const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.CIPHER_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

router.put("/generateAuthToken", async (req, res) => {
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

    const tokenAuth = await models.Token.findOne({ where: { name: "auth" } });

    if(tokenAuth){ //token exists
      const [updated] = await models.Token.update(
        {
          token: encryptToken(token),
          updatedAt: Date.now(),
        },
        {
          where: {
            name: "auth",
          },
        }
      );

      if(updated){
        res.sendStatus(201);
      }
    }
    else{ //token do not exists
      await models.Token.create({name: "auth", token: encryptToken(token), createdAt: Date.now(), updatedAt: Date.now()});
    }

  } catch (error) {
    res.status(500);
  }
});

router.post("/register", async (req, res) => {
  try {
    const token = await models.Token.findOne({ where: { name: "auth" } });
    const desencriptedToken = decryptToken(token.dataValues.token);

    // Request an access token from Auth0
    const response = await axios.post(
      process.env.AUTH0_API_URL + "/api/v2/users",
      {
        email: req.body.email,
        password: req.body.password,
        connection: "Username-Password-Authentication",
      },
      {
        headers: {
          Authorization: "Bearer " + desencriptedToken,
        },
      }
    );

    // Send response
    if (response) {
      return res.sendStatus(201);
    }

    // If any other unexpected response status occurs
    res.sendStatus(500);
  } catch (error) {
    console.error(error.status);
    res.sendStatus(error.status); // Internal Server Error
  }
});

router.post("/login", async (req, res) => {
  // try {
    const { email, password, userType } = req.body;

    // Login User
    const response = await axios.post(process.env.AUTH0_API_URL + "/oauth/token", {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_API_URL + "/api/v2/",
      scope: "openid profile email",
      realm: "Username-Password-Authentication",
      grant_type: "password",
      username: email,
      password: password
    });

    if(userType === "client"){
      const existingClient = await models.Client.findOne({where: {email: email}
      });
  
      if(existingClient){
        return res.status(201).json(existingClient.dataValues);
      }
    }

    if(userType === "employee"){
      const existingEmployee = await models.Employee.findOne({where: {email: email}
      });
  
      if(existingEmployee){
        return res.status(201).json(existingEmployee.dataValues);
      }
    }

  // } catch (error) {
  //   console.error(error.status);
  //   res.sendStatus(error.status); // Internal Server Error
  // }
});

module.exports = router;