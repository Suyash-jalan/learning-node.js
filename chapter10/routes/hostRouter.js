const express = require('express');
const hostRouter = express.Router();

//local module
const hostController= require("../controllers/hostController");
hostRouter.get("/add-home",hostController.getaddHome );
hostRouter.post("/add-home", hostController.postaddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);

module.exports = hostRouter;

