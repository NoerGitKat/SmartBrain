const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "smartbrain"
  }
});

db
  .select("*")
  .from("users")
  .then(data => console.log(data));

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(db.users);
});

server.post("/signin", (req, response) => {
  const { email, password } = req.body;

  db
    .select("email", "hash")
    .from("login")
    .then(data => {
      let foundEmail;
      let matchedPassword;
      let userId;
      for (let x = 0; x < data.length; x++) {
        if (email === data[x].email) {
          foundEmail = true;
          userId = x;
        }
      }
      bcrypt.compare(password, data[userId].hash, (err, res) => {
        matchedPassword = res;
        if (foundEmail && matchedPassword) {
          db
            .select("*")
            .from("users")
            .where("email", email)
            .then(user => {
              return response.status(200).json(user);
            });
        } else {
          return response
            .status(400)
            .json({ message: "Submitted wrong credentials!" });
        }
      });
    })
    .catch(err => console.log("err", err));
});

server.post("/register", (req, res) => {
  const { email, password, name } = req.body.user;
  const saltRounds = 10;
  if (email && password && name) {
    let userPassword = password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        userPassword = hash;
        db("login")
          .insert({
            hash: userPassword,
            email: email
          })
          .then(data => {
            return db("users")
              .returning("*")
              .insert({
                email: email,
                name: name,
                joined: new Date().toLocaleString()
              })
              .then(data => {
                res.json(data);
              })
              .catch(err => res.status(400).json(err));
          })
          .catch(err => res.status(400).json(err));
      });
    });
  } else {
    res.status(400).send("missing information");
  }
});

server.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db
    .select("*")
    .from("users")
    .where({
      id: id
    })
    .then(user => {
      if (user.length) {
        console.log(user);
      } else {
        res.status(400).json("User not found!");
      }
      console.log("user", user);
    })
    .catch(err => res.status(400).json("Error getting user"));
});

server.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => console.log(entries))
    .catch(err => {
      return res.status(400).json("Unable to submit entry!");
    });
});

const thisServer = server.listen(3001, () => {
  console.log(`Listening to your thoughts at ${thisServer.address().port}`);
});
