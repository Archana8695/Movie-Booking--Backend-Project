const User = require("../models").user;
const { v4: uuidv4 } = require("uuid");
const TokenGenerator = require("uuid-token-generator");
const tokenGen = new TokenGenerator(TokenGenerator.BASE62);
const { btoa, atob } = require("b2a");
const { user } = require("../models");
exports.signUp = (req, res) => {
  const {
    userid,
    first_name,
    last_name,
    email_address,
    password,
    mobile_number,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email_address ||
    !password ||
    !mobile_number
  ) {
    res.status(400).send({
      message: "Please provide the required details to create an account",
    });
    return;
  }
  const userName = first_name + last_name;
  const passwordHash = btoa(password);
  const token = tokenGen.generate();
  const uuid = uuidv4();

  User.findOne({ email: email_address }, (err, user) => {
    if (!err && user === null) {
      // create a user
      const newUser = new User({
        userid: userid,
        username: userName,
        email: email_address,
        first_name: first_name,
        last_name: last_name,
        contact: mobile_number,
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
  const { uuid } = req.body;
  if (!uuid) {
    res.status(400).send({ message: "provide the uuid of the user" });
    return;
  }
  User.findOne({ uuid: uuid })
    .then((user) => {
      if (user === null) {
        res.status(401).send({ message: "user id doesnt exist" });
      } else {
        user.isLoggedIn = false;
        User.findOneAndUpdate({ userid: uuid }, user, { new: true })
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

exports.getCoupon = (req, res) => {
  const userid = req.body.userid;
  if (!userid) {
    res.status(400).send({ message: "Please provide the user id" });
    return;
  }
  User.findOne({ userid: userid })
    .select("coupens")
    .then((data) => {
      data === null
        ? res.send(404).send({ message: "You dont have any coupens" })
        : res.send(data);
    })
    .catch((err) =>
      res.status().send({ message: "Something went wrong", error: e.message })
    );
};

exports.bookShow = (req, res) => {
  const { userid, bookingrequests } = req.body;
  if (!userid || !bookingrequests) {
    res
      .status(400)
      .send({ message: "Provide the userid and booking requests" });
    return;
  }
  User.findOne({ userid: userid })
    .then((user) => {
      if (user === null) {
        res.status(400).send({ message: "No such user" });
      } else {
        user.bookingrequests.push(bookingrequests);
        user
          .findOneAndUpdate({ userid: userid }, user, { new: true })
          .then((user) => res.send(user.bookingrequests))
          .catch((e) =>
            res.status(500).send({ message: "Somthing went wrong", error: e })
          );
      }
    })
    .catch((e) =>
      res.status(500).send({ message: "Somthing went wrong", error: e })
    );
};
exports.bookings = (req, res) => {
  // const {uuid} = req.
};