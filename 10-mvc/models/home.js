const homes = [];

module.exports = class Home{
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }
    save(){
        homes.push(this);
    }
    static fetchAll(){
        return homes;
    }
}