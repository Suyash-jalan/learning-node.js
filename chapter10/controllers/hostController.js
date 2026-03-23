const Home = require("../models/home");

exports.getaddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("host/host-home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "Host Homes list",
      CurrentPage: "Host Home",
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
  );
  home.save();

  res.render("host/homeAdded", { pageTitle: "Home added" });
};

