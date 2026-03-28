const path = require('path');


const express = require('express');
const storerouter = express.Router();

const homesController= require("../controllers/storeController");
storerouter.get("/",homesController.getIndex);
storerouter.get("/bookings",homesController.getbooking);
storerouter.get("/homes",homesController.getHomes);
storerouter.get("/favourites",homesController.getfavouritelist);
storerouter.post("/favourites",homesController.postfavourite);

storerouter.get("/homes/:homeId",homesController.getHomeDetails);
module.exports = storerouter;