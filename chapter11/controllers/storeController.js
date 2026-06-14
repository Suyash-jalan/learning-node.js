const Home = require("../models/home");
const User = require("../models/user");


exports.getIndex = (req, res, next) => {
  Home.find().then(RegisteredHomes =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user, 
    }),
  );
};

exports.getHomes = (req, res, next) => {
  Home.find().then(RegisteredHomes =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "Homes list",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user 
    }),
  );
};

exports.getbooking = (req, res, next) => {
    res.render("store/booking", {
      pageTitle: "My Bookings",
      currentPage: "booking",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user 
    })
};

exports.getfavouritelist = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};

exports.postAddFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites"); 
};

exports.postRemoveFromFavourite = async (req, res, next) => {
 const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId; 
  
  console.log("ID from URL:", homeId);

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("home not found");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      path: "/homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user 
    });
  }).catch(err => {
    console.log("Error loading home detail: ", err);
    next(err);
  });
};

exports.postfavourite = (req, res, next) => {
  res.redirect("/favourites");
};

