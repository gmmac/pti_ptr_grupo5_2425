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
  // try {
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

  // } catch (error) {
  //   res.status(500);
  // }
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
  try {
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
      const existingClient = await models.Client.findOne({where: {email: email}});
      if(existingClient){
        res.cookie("clientInfo", existingClient.dataValues, {
          httpOnly: true,    
          secure: false, // Permite o cookie em HTTP durante o desenvolvimento
          sameSite: "Lax", // Mais flexível que "Strict" para testes locais
          maxAge: 24 * 60 * 60 * 1000 // 1 dia
        });
        
        return res.status(201).json(existingClient.dataValues);
      } else{
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    }

    else if(userType === "employee"){
      const existingEmployee = await models.Employee.findOne({where: {email: email}
      });

      if(existingEmployee){

        res.cookie("employeeInfo", existingEmployee.dataValues, {
          httpOnly: true,    
          secure: false, // Permite o cookie em HTTP durante o desenvolvimento
          sameSite: "Lax", // Mais flexível que "Strict" para testes locais
          maxAge: 24 * 60 * 60 * 1000 // 1 dia
        });
        
        return res.status(201).json(existingEmployee.dataValues);
      }
    }

    else if(userType === "organizer"){
      const existingOrganizer = await models.Organizer.findOne({where: {email: email}
      });

      if(existingOrganizer){

        res.cookie("organizerInfo", existingOrganizer.dataValues, {
          httpOnly: true,    
          secure: false, // Permite o cookie em HTTP durante o desenvolvimento
          sameSite: "Lax", // Mais flexível que "Strict" para testes locais
          maxAge: 24 * 60 * 60 * 1000 // 1 dia
        });
        
        return res.status(201).json(existingOrganizer.dataValues);
      }
    }

  } catch (error) {
    console.error(error);
  
    if (error.response?.status === 403) {
      console.log(error.response)
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  
    return res.status(500).json({ message: "Internal Server Error" });
  }
  

});

router.post("/changePassword", async (req, res) => {
  // try {
    const { email } = req.body;

    // Change password
    const response = await axios.post(process.env.AUTH0_API_URL + "/dbconnections/change_password", {
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: "Username-Password-Authentication",
      email: email,
    });
    
    res.status(201).json("Email Sent")
  // } catch (error) {
  //   console.error(error.status);
  //   res.sendStatus(error.status); // Internal Server Error
  // }
});


router.get("/getUserByEmail/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Buscar token armazenado no banco
    const token = await models.Token.findOne({ where: { name: "auth" } });
    if (!token) return res.status(500).json({ error: "Auth Token not found" });

    const desencriptedToken = decryptToken(token.dataValues.token);

    // Buscar usuário pelo email na API do Auth0
    const response = await axios.get(`${process.env.AUTH0_API_URL}/api/v2/users-by-email?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: "Bearer " + desencriptedToken }
    });

    if (response.data.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(response.data[0]); // Retorna o primeiro usuário encontrado

  } catch (error) {
    console.error("Erro ao buscar usuário:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

router.get("/user-info", (req, res) => {

  let userInfoName = "clientInfo"
  if(req.query.userType === 'employee'){
    userInfoName = "employeeInfo";
  }
  else if(req.query.userType === 'organizer'){
    userInfoName = "organizerInfo";
  }
  
  let userInfo = req.cookies[userInfoName];

  return res.status(200).json({ userInfo: userInfo });
});

router.get('/logout', (req, res) => {
  
  let userInfo = "clientInfo"
  //é employee. enviar variável na query
  if(req.query.userType === 'employee'){
    userInfo = "employeeInfo";
  }
  else if(req.query.userType === 'organizer'){
    userInfo = "organizerInfo";
  }
  
  res.clearCookie(userInfo, {
    httpOnly: true,
    secure: false, 
    sameSite: "Lax"
  });

  return res.status(200).json({ message: 'Logout realizado com sucesso.' });
});


module.exports = router;