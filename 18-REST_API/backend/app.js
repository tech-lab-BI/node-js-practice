//core module
const path = require("path");
//external module
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors');
//local module
const errorsController = require("./controllers/errors");
const todoItemRouter = require("./routes/todoItemRouter");

const dbPath =
  "mongodb://root:root@ac-hb1tzqd-shard-00-00.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-01.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-02.fhpqazo.mongodb.net:27017/TodoItem?ssl=true&replicaSet=atlas-km16gb-shard-0&authSource=admin&appName=test";
const PORT = 3001;

const app = express();

app.use(express.urlencoded());
app.use(cors());
app.use(express.json());

app.use("/api/todo", todoItemRouter);
app.use(errorsController.pageNotFound);

mongoose.connect(dbPath).then(() => {
  app
    .listen(PORT, () => {
      console.log("SERVER START......");
    });
});
