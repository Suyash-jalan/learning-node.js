const path = require('path');


const express = require('express');
const storerouter = express.Router();

const storeController= require("../controllers/storeController");
storerouter.get("/",storeController.getIndex);
storerouter.get("/bookings",storeController.getbooking);
storerouter.get("/homes",storeController.getHomes);
storerouter.get("/favourites",storeController.getfavouritelist);
storerouter.post("/favourites", storeController.postAddFavourite);
storerouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

storerouter.get("/homes/:homeId",storeController.getHomeDetails);

module.exports = storerouter;