const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const favouriteDataPath =path.join( rootDir,'data', 'homes.json');


module.exports = class favourite{
    static addtofavourite(homeid,callback){
        favourite.getFavourite((favourite)=>{
                if(favourite.includes(homeid)){
                    callback("Home is already marked favourites");
                }else{
                    favourite.push(homeId);
                    fs.writeFile(favouriteDataPath, JSON.stringify(favourite), callback);
                }                
                });

    }

    static egtfavourites(callback){
         fs.readFile(homeDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : {});
                  
                });
    }

}

