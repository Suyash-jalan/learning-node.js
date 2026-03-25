const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const homeDataPath =path.join( rootDir,'data', 'homes.json');


module.exports = class Home{
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save(){
        this.id = Math.random().toString();
        Home.fetchAll((RegisteredHomes)=>{
        RegisteredHomes.push(this);
        
        fs.writeFile(homeDataPath, JSON.stringify(RegisteredHomes), error =>{
            console.log("file writting concluded", error);
        });
        });
    }

    static fetchAll(callback) {
        const homeDataPath =path.join( rootDir,'data', 'homes.json');
        fs.readFile(homeDataPath, (err, data) => {
            

            if(!err){
                callback(JSON.parse(data));
            }else{callback([]);}
          
        });
        
    }

    static findById(homeId, callback) {
    this.fetchAll(homes => {
        // Add this log to see what is being compared
        console.log("Searching for ID:", homeId, "Type:", typeof homeId);
        console.log("First home in file:", homes[0]?.id, "Type:", typeof homes[0]?.id);

        const homeFound = homes.find(home => home.id === homeId);
        callback(homeFound);
    });
}

}

