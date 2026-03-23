const express = require('express');
const hostRouter = express.Router();

//local module
const homesController= require("../controllers/homes");
hostRouter.get("/add-home",homesController.getaddHome );
hostRouter.post("/add-home", homesController.postaddHome);

exports.hostRouter = hostRouter;

