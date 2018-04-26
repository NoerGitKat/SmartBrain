const handleSignin = (req, response, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json("Please fill in the correct password and email address!");
  }
  db
    .select("email", "hash")
    .from("login")
    .then(data => {
      let foundEmail;
      let matchedPassword;
      let userId;
      for (let x = 0; x < data.length; x++) {
        console.log("data inisde loop", data[x].email);
        if (email === data[x].email) {
          foundEmail = true;
          userId = x;
        }
      }
      console.log("userId", userId);
      console.log("foundEmail", foundEmail);
      if (foundEmail) {
        bcrypt.compare(password, data[userId].hash, (err, res) => {
          matchedPassword = res;
          if (matchedPassword) {
            db
              .select("*")
              .from("users")
              .where("email", email)
              .then(user => {
                return response.status(200).json(user);
              })
              .catch(err => console.log("err"));
          } else {
            return response
              .status(400)
              .json({ message: "Submitted wrong credentials!" });
          }
        });
      } else {
        return response.status(400).json({ message: "User doesn't exist!" });
      }
    })
    .catch(err => console.log("err", err));
};

module.exports = {
  handleSignin
};
