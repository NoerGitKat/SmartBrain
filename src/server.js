const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const server = express();

const db = {
  users: []
};

server.use(bodyParser.json());
server.use(cors());

// routes:
// GET "/", which is dashboard when logged in
// if not logged in then GET "/signin"
// POST "/signin" for DB auth
// on signin page link to GET "/register"
// POST "register" to add new row DB
// GET "/profile/:userId" for user personal profile

server.get("/", (req, res) => {
  res.send(db.users);
});

server.post("/signin", (req, response) => {
  const { email, password } = req.body;

  for (let x = 0; x < db.users.length; x++) {
    bcrypt.compare(password, db.users[x].password, function(err, res) {
      const correctPass = res;
      if (email === db.users[x].email && correctPass) {
        return response.status(200).json(db.users[x]);
      } else {
        console.log("password wrong");
        return response.status(400).send("no match found");
      }
    });
  }
});

server.post("/register", (req, res) => {
  const { email, password, name } = req.body.user;
  const saltRounds = 10;
  if (email && password && name) {
    let userPassword = password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        userPassword = hash;
        console.log("userPassword", userPassword);
        db.users.push({
          id: "125",
          name,
          email,
          password: userPassword,
          entries: 0,
          joined: new Date()
        });
        return res.json(db.users);
      });
    });
  } else {
    res.send("missing information");
  }
});

server.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("user not known!");
  }
});

server.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("user not known!");
  }
});

const thisServer = server.listen(3001, () => {
  console.log(`Listening to your thoughts at ${thisServer.address().port}`);
});
