const db = require("../utils/databaseUtil");

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
        
    }

    static fetchAll() {
       return  db.execute('SELECT * FROM homes');
       
    }

    static findById(homeId, callback) {
    
    
    }

    static DeleteById(homeId, callback) {

    }

}

