const User = require("../models").user;
const { v4: uuidv4 } = require("uuid");
const TokenGenerator = require("uuid-token-generator");
const tokenGen = new TokenGenerator(TokenGenerator.BASE62);
const { btoa, atob } = require("b2a");

exports.signUp = (req, res) => {
  const { userid, firstName, lastName, email, password, contact } = req.body;
  if (!firstName || !lastName || !email || !password || !contact) {
    res.status(400).send({
      message: "Please provide the required details to create an account",
    });
    return;
  }
  const userName = firstName + lastName;
  const passwordHash = btoa(password);
  const token = tokenGen.generate();
  const uuid = uuidv4();

  User.findOne({ email: email }, (err, user) => {
    if (!err && user === null) {
      // create a user
      const newUser = new User({
        userid: userid,
        username: userName,
        email: email,
        first_name: firstName,
        last_name: lastName,
        contact: contact,
        password: passwordHash,
        uuid: uuid,
        role: req.body.role ? req.body.role : "user",
        accesstoken: token,
      });

      newUser
        .save()
        .then((data) => res.status(200).send(data))
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(400).send({ message: "User already exists" });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Provide email and password to continue" });
    return;
  }
  User.findOne({ email: email }).then((user) => {
    if (user !== null) {
      if (user.password === btoa(password)) {
        user.isLoggedIn = true;
        User.findOneAndUpdate({ email, email }, user, { new: true })
          .then((data) => res.send(data))
          .catch((e) =>
            res
              .status(500)
              .send({ message: "Something went wrong. Try Again!" })
          );
      } else {
        res.status(401).send({ message: "Password is incorrect. Try again!" });
      }
    } else {
      res.status(401).send({ message: "Email not found. Please register" });
    }
  });
};

exports.logout = (req, res) => {
  const { userid } = req.body;
  if (!userid) {
    res.status(400).send({ message: "provide the userid of the user" });
    return;
  }
  User.findOne({ userid: userid })
    .then((user) => {
      if (user === null) {
        res.status(401).send({ message: "user id doesnt exist" });
      } else {
        user.isLoggedIn = false;
        User.findOneAndUpdate({ userid: userid }, user, { new: true })
          .then((data) => res.send(data))
          .catch((e) => {
            console.log("error", e);
            res
              .status(500)
              .send({ message: "something went wrong. Try again" });
          });
      }
    })
    .catch((e) => {
      console.log("error", e);
      res.status(500).send({ message: "something went wrong. Try again" });
    });
};