const handleSignin = (req, response, db, bcrypt) => {
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
};

module.exports = {
  handleSignin
};
