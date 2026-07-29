const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "mongodb://root:root@ac-hb1tzqd-shard-00-00.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-01.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-02.fhpqazo.mongodb.net:27017/?ssl=true&replicaSet=atlas-km16gb-shard-0&authSource=admin&appName=test";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(url)
  .then((client)=>{
    _db = client.db("airbnb");
    callback();
  }).catch((err)=>{
    console.log(err);
  })
}

const getDB = () => {
  if(!_db){
    throw new Error("Database not connectd");
  }else{
    return _db;
  }
}

module.exports = {mongoConnect, getDB};