const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    }),
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "Homes list",
      currentPage: "home",
    }),
  );
};

exports.getbooking = (req, res, next) => {
    res.render("store/booking", {
      pageTitle: "My Bookings",
      currentPage: "booking",
    })
};

exports.getfavouritelist = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("store/favourite-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    }),
  );
};
