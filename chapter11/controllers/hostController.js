const Home = require("../models/home");
const fs = require("fs");

exports.getaddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};
   
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "host-home",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user 
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then(RegisteredHomes =>
    res.render("host/host-home-list", {
      RegisteredHomes: RegisteredHomes,
      pageTitle: "Host Homes list",
      currentPage: "host-home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    }),
  );
};

exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  console.log(houseName, price, location, rating, description);
  console.log(req.file);

  if(!req.file){
    return res.status(422).send("No image provided");
  }

  const photo = req.file.path;

  const home = new Home(
    {houseName,
    price,
    location,
    rating,
    photo,
    description}
  );
  home.save().then(() =>{
    console.log('Home Saved successfully');
    res.redirect("/host/host-home-list"); 
  }).catch(err => {
    console.log(err);
    res.redirect("/host/host-home-list");
  });
  
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;
  
  Home.findById(id).then((home) => {
    if (!home) {
      console.log("Home not found for updating");
      return res.redirect("/host/host-home-list");
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    
    home.description = description;
   
    if(req.file){
      fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error occur when you delete file is ", err);
          }
      });
      home.photo = req.file.path;
    }


    return home.save();
  }).then((result) => {
    console.log("Home update", result);
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("error while updating/finding ", err);
    res.redirect("/host/host-home-list");
  });
};

exports.postDeleteHome = (req, res, next) => {
 const homeId = req.params.homeId;
 console.log("Came to delete ",homeId);
 Home.findByIdAndDelete(homeId)
  .then(() => {
    res.redirect("/host/host-home-list");
  })
  .catch(error => {
    console.log("error while deleting", error);
    res.redirect("/host/host-home-list");
  });
};
