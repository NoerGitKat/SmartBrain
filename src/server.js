const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

// Controllers
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "smartbrain"
  }
});

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(db.users);
});

server.post("/signin", (req, response) => {
  signin.handleSignin(req, response, db, bcrypt);
});

server.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

server.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

server.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

const thisServer = server.listen(3001, () => {
  console.log(`Listening to your thoughts at ${thisServer.address().port}`);
});
