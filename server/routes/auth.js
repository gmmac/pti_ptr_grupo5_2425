const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Função para criptografar dados
// const encrypt = (data) => {
//   const algorithm = "aes-256-ctr";
//   const secretKey = process.env.CIPHER_SECRET_KEY;
  
//   const iv = crypto.randomBytes(16);  // Inicialização do vetor aleatório

//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
//   let encrypted = cipher.update(data, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   return iv.toString("hex") + ":" + encrypted;
// };

router.post("/register", async (req, res) => {
  //try {
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
    //const encryptedToken = encrypt(token);

    // Define o cookie HTTP-only
    res.cookie("auth_token", token, {
      httpOnly: true, // Impede acesso via JavaScript no navegador
      sameSite: "Strict", // Proteção contra CSRF
      maxAge: 86400000 , // Tempo de vida do cookie (24 horas)
    });

    res.json({ message: "Token armazenado com sucesso!" });
  // } catch (error) {
  //   console.error("Erro ao obter token:", error.response?.data || error.message);
  //   res.status(500).json({ error: "Erro ao obter token" });
  // }
});

module.exports = router;