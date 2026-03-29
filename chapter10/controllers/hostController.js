const Home = require("../models/home");

exports.getaddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId, (home) => {
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
    });
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

  res.redirect("/host/host-home-list"); 
  
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl,
    req.body.description,
  );
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list"); 

};

exports.postDeleteHome = (req, res, next) => {
 const homeId = req.params.homeId;
 console.log(homeId);
 Home.DeleteById(homeId, error =>{
  if(error){
    console.log("error while deleting", error);
  }
  res.redirect("/host/host-home-list");
 })  
};
