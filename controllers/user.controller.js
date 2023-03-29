const User = require("../models/user.model");

const logger = require("../logger/logger"); //για τα logs (με την βιβλιοθήκη winston), δες folder logger
//κάνω exports τον logger στο τέλος τους κώδικα

exports.findAll = function (req, res) {
  console.log("Find ALL users");

  // User.find({'address.area':'area1'})
  User.find({}, (err, results) => {
    if (err) {
      //   throw err; //ΝΑ ΜΗΝ ΤΟ ΚΑΝΟΥΜΕ ΠΟΤΕ ΓΙΑΤΙ ΣΤΑΜΑΤΑΕΙ Η ΕΦΑΡΜΟΓΗ, κρασάρει
      //ΑΝΤ'ΑΥΤΟΥ ΝΑ ΒΑΛΟΥΜΕ TRY CATCH
      res.status(400).json({ status: false, data: err });
      logger.error("Error in reading users", err); //Winston Logger
      console.log("Problem in reading users", err);
    } else {
      //ΝΑ ΜΗΝ ΚΑΝΟΥΜΕ ΟΥΤΕ ΕΔΩ throw, η εφαρμογή θα κρασάρει
      //ΑΝΤ'ΑΥΤΟΥ ΝΑ ΒΑΛΟΥΜΕ TRY CATCH
      res.status(200).json({ status: true, data: results });
      console.log("Success in reading users");
      logger.info("success in reading all users"); //Winston Logger
      logger.warn("Warn in reading all users");
      logger.error("Error in reading all users"); //και στα άλλα μπορώ να βάλω το results
      logger.debug("Degug in reading all users", results);
    }
  });
  // res.json({status:true, data:"Find All Controller"});
};

exports.findOne = function (req, res) {
  const username = req.params.username;

  console.log("Find One Controller", username);
  // res.json({status:true, data:"Find One Controller"});

  User.findOne({ username: username }, (err, results) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Problem in finding user with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: results });
      console.log("Success in finding user");
    }
  });
};

exports.create = function (req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products,
  });

  console.log("Insert user with username", req.body.username);

  newUser.save((err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("Problem in creating user", err);
    } else {
      res.status(200).json({ status: true, data: results });
      console.log("Success in finding user");
    }
  });
};

exports.update = function (req, res) {
  const username = req.body.username;

  const updateUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };

  User.findOneAndUpdate({ username: username }, updateUser, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("Problem in updating user", err);
    } else {
      res.status(200).json({ status: true, data: results });
      console.log("Success in updating user");
    }
  });
};

exports.delete = function (req, res) {
  const username = req.params.username;

  console.log("Delete user ", username);

  User.findOneAndDelete({ username: username }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("Problem in deleting user", err);
    } else {
      res.status(200).json({ status: true, data: results });
      console.log("Success in deleting user");
    }
  });
};

module.exports = logger;
