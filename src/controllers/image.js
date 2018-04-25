const handleImage = (req, res, db) => {
  const { id } = req.body;
  console.log("what is id", id);
  db("users")
    .where("id", id)
    .increment("entries", 1)
    .returning("*")
    .then(user => {
      console.log("user", user);
      return res.json(user[0]);
    })
    .catch(err => {
      return res.status(400).json("Unable to submit entry!");
    });
};

module.exports = {
  handleImage
};
