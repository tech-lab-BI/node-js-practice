//local module

const { default: mongoose } = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true }, // multiple charecteristics
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: String,
  description: String,
});

const Home = mongoose.model("Home", homeSchema);

function getData() {
  // const db = getDB();
  // return db.collection("homes").find().toArray();
  return Home.find();
}

function putData(homeId, home) {

  if(homeId){
    return Home.findByIdAndUpdate(homeId, home);
  }
  else{
    const homeData = new Home(home);
    return homeData.save();
  }
}

function findById(homeId) {
  // const db = getDB(); //homeId - string(in ejs) | ObjectID(in dbms)
  // return db
  //   .collection("homes")
  //   .find({ _id: new ObjectId(String(homeId)) })
  //   .next();
  return Home.findById(homeId);
}

function deleteById(homeId) {
  // const db = getDB();
  // return db
  //   .collection("homes")
  //   .deleteOne({ _id: new ObjectId(String(homeId)) });
  return Home.findByIdAndDelete(homeId);
}

module.exports = { getData, putData, findById, deleteById, Home };
