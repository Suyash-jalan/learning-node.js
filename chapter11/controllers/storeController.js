const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then(RegisteredHomes =>
    res.render("store/home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    }),
  );
};

exports.getHomes = (req, res, next) => {
  Home.find().then(RegisteredHomes =>
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
  Favourite.find()
  .populate('houseId')
  .then(favourites => {
    // filter out orphaned favourites where the home was deleted
    const favouriteHomes = favourites.map(fav => fav.houseId).filter(home => home !== null);

      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    }).catch(err => {
      console.log("Error loading favourites: ", err);
      next(err);
    });
};

exports.postAddFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  Favourite.findOne({houseId : homeId}).then((fav) => {
    if(fav){
      console.log("Already marked as favourites");
    }else{
      fav = new Favourite({houseId: homeId});
      fav.save().then((result) => {
         console.log("Fav added: ", result);
      }).catch(err => {
        console.log("Error saving favourite: ", err);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
  .then((result) => {
    console.log('Fav Removed: ', result);
    res.redirect("/favourites");
  }).catch(err =>{
    console.log("error while remove from favourite", err);
  });
  
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
    });
  }).catch(err => {
    console.log("Error loading home detail: ", err);
    next(err);
  });
};

exports.postfavourite = (req, res, next) => {
  res.redirect("/favourites");
};

