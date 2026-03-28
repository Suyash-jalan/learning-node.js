const Home = require("../models/home");

exports.getaddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("host/host-home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "Host Homes list",
      currentPage: "host-home",
    }),
  );
};

exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl,
    req.body.description,
  );
  home.save();

  res.render("host/homeAdded", { 
    pageTitle: "Home added",
    currentPage: "add-home" 
  });
};

