const Home = require("../models/home");

exports.getaddHome = (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
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

  res.render("homeAdded", { pageTitle: "Home added" });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("home", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "airbnb Home",
      CurrentPage: "Home",
    }),
  );
};
