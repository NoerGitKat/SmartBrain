const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("herrro");
});

server.post("/signin", (req, res) => {
  res.json("signin");
});

server.listen(4000, () => {
  console.log(`Listening to your thoughts at ${server.address().port}`);
});
