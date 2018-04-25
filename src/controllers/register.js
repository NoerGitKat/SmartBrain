const handleRegister = (req, res, db, bcrypt) => {
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
};

module.exports = {
  handleRegister
};
