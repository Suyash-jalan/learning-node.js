const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "airbnb Home",
      CurrentPage: "Index",
    }),
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "Homes list",
      CurrentPage: "Home",
    }),
  );
};

exports.getbooking = (req, res, next) => {
    res.render("store/booking", {
      pageTitle: "My Bookings",
      CurrentPage: "Booking",
    })
};

exports.getfavouritelist = (req, res, next) => {
  Home.fetchAll((RegisteredHomes) =>
    res.render("store/favourite-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "My Favourites",
      CurrentPage: "Favourites",
    }),
  );
};
