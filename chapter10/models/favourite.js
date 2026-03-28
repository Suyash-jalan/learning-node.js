const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class Favourite {
  static addtofavourite(homeId, callback) {
    Favourite.getFavourite((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourites");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        try {
          callback(JSON.parse(data));
        } catch (parseErr) {
          callback([]);
        }
      }
    });
  }
};

