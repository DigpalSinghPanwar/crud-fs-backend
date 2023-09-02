const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const dotenv = require("dotenv");
dotenv.config();

const DATABASE = process.env.DATABASE;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(DATABASE);

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  UserModel.findById({ _id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.put("/edituser/:id", (req, res) => {
  const _id = req.params.id;
  UserModel.findByIdAndUpdate({ _id }, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.delete("/deleteuser/:id", (req, res) => {
  const _id = req.params.id;
  UserModel.findByIdAndDelete({ _id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.post("/adduser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});
