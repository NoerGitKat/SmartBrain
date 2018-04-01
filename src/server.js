const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const server = express();

const db = {
  users: [
    {
      id: "122",
      name: "noer",
      email: "noer@noer.com",
      password: "chocolate",
      entries: 0,
      joined: new Date()
    },
    {
      id: "123",
      name: "Coolguy",
      email: "Coolguy@Coolguy.com",
      password: "chocolate",
      entries: 0,
      joined: new Date()
    }
  ]
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

server.post("/signin", (req, res) => {
  console.log("response", res);
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).send("no match found");
  }
});

server.post("/register", (req, res) => {
  const { email, password, name, id } = req.body;
  const saltRounds = 10;
  if (email && password && name && id) {
    let userPassword = password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        userPassword = hash;
        console.log("userPassword", userPassword);
        db.users.push({
          id,
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
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("user not known!");
  }
});

const thisServer = server.listen(3001, () => {
  console.log(`Listening to your thoughts at ${thisServer.address().port}`);
});
