const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const Favourite = require('./favourite');

const homeDataPath =path.join( rootDir,'data', 'homes.json');


module.exports = class Home{
    constructor(houseName, price, location, rating, photoUrl, description){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
    }

    save(){
        Home.fetchAll((RegisteredHomes)=>{

        if(this.id){//this is edit home case
           RegisteredHomes = RegisteredHomes.map(home =>{
            if(home.id === this.id){
               return this;
            }
            return home;
           })
        }else{// this is add home case
            this.id = Math.random().toString();
            RegisteredHomes.push(this);
        }
                
        fs.writeFile(homeDataPath, JSON.stringify(RegisteredHomes), error =>{
            console.log("file writting concluded", error);
        });
        });
    }

    static fetchAll(callback) {
        const homeDataPath =path.join( rootDir,'data', 'homes.json');
        fs.readFile(homeDataPath, (err, data) => {
            callback(!err ? JSON.parse(data): []);
          
        });
        
    }

    static findById(homeId, callback) {
    this.fetchAll(homes => {
        

        const homeFound = homes.find(home => home.id === homeId);
        callback(homeFound);
    });
}

    static DeleteById(homeId, callback) {
    this.fetchAll(homes => {
    
        homes = homes.filter(home => home.id !== homeId);
        
        fs.writeFile(homeDataPath, JSON.stringify(homes),error => {
            Favourite.DeleteById(homeId, callback);
        });
        });
        
    
}

}

