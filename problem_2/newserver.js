const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const client = new MongoClient("mongodb://localhost:27017/doubts");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
{
  useNewUrlParser: true;
}
{
  useUnifiedTopolgy: true;
}
const doubtSchema = {
  name: String,
  email: String,
  phone: String,
  doubt: String,
};

const Doubt = mongoose.model("Doubt", doubtSchema);

//declarting methods.
const fetchDoubt = async () => {
  try {
    await client.connect();
    const database = client.db("doubts");
    const db = database.collection("AKM");
    console.log("-------DATABASE CONNECTED TO FETCH !!--------");
    array = [];
    db.find({})
      .toArray()
      .then((ans) => {
        console.log(ans);
      });
  } catch (error) {
    console.log(error);
  }
};

const run = async (userName, userDoubt, userPhone, userEmail) => {
  try {
    await client.connect();
    const database = client.db("doubts");
    const db = database.collection("AKM");
    console.log("-------DATABASE CONNECTED TO STORE !!--------");
    //testing functionality using predefined function

    createDoubt(db, userName, userDoubt, userPhone, userEmail);
    // process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

const createDoubt = async (db, userName, userDoubt, userPhone, userEmail) => {
  try {
    if (await db.findOne({ doubt: userDoubt })) {
      console.log("doubt exists");
      process.exit(0);
    } else {
      await client.connect();
      await db.insertOne({
        name: userName,
        email: userEmail,
        phone: userPhone,
        doubt: userDoubt,
      });
      console.log("New Doubt added");
      process.exit(0);
    }
  } catch (error) {
    console.log(error);
  }
};

app.get("/", function (req, res) {
  res.sendFile("./index.html", { root: __dirname });

  // res.sendFile("./views/index.html", { root: __dirname })
});

app.post("/", function (req, res) {
  let newDoubt = new Doubt({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    doubt: req.body.doubt,
  });
  newDoubt.save();
  console.log(newDoubt);
  try {
    run(newDoubt.name, newDoubt.doubt, newDoubt.phone, newDoubt.email);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server is running on 3000");
});

setInterval(() => {
  fetchDoubt();
}, 3000);
