const path = require('path');


const express = require('express');
const authrouter = express.Router();

const authController= require("../controllers/authController");
authrouter.get("/login", authController.getLogin);
authrouter.post("/login", authController.postLogin);
authrouter.post("/logout", authController.postLogout);
authrouter.get("/signup", authController.getSignup);
authrouter.post("/signup", authController.postSignup);


module.exports = authrouter;