const favourite = require("../models/favourite");
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
  favourite.getfavourite((favourite) => {
    Home.fetchAll((RegisteredHomes) => {
      const favouriteHomes = RegisteredHomes.filter(home => favourite.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddFavourite =(req, res, next) => {
  console.log("came to add to favourite", req.body);
  favourite.addtofavourite(req.body.id, error =>{
    if(error){
      console.log("error will marking favourite", error);
    }
    res.redirect("/favourite");
  })
  
}


exports.getHomeDetails = (req, res, next) => {
  // Use the exact name defined in your router (e.g., 'homeId')
  const homeId = req.params.homeId; 
  
  console.log("ID from URL:", homeId); // Debug: Ensure this isn't undefined

  Home.findById(homeId, home => {
    if (!home) {
      console.log("home not found");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      path: "/homes",
    });
  });
};

exports.postfavourite = (req, res, next) => {
  res.redirect("/favourites");
};

