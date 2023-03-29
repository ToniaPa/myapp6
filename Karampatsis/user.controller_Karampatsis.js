const User = require('../models/user.model')

exports.findAll = function (req, res) {
  console.log("Find all users");

  User.find({}, (err, results)=>{
    if (err){
      res.status(400).json({ status: false, data: err});
      console.log('Problem in reading users', err); 
    } else {
      res.status(200).json({ status: true, data: results});
      console.log('Success in reading users'); 
    }
  });
};

exports.findOne = function (req, res) {

  const username = req.params.username;

  console.log("Find user with username", username);
  
  User.findOne({ username: username },{address:1, username:1}, (err, results) =>{
    if (err) {
      res.status(400).json({ status: false, data: err});
      console.log(`Problem in finding user with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: results});
      console.log('Success in finding user', username); 
    }

  });
}

exports.create = function (req, res) {
  
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products
  });

  console.log("Insert user with username", req.body.username);

  newUser.save((err,result) =>{
    if (err) {
      res.status(400).json({ status: false, data: err});
      console.log(`Problem in creating user`, err);
    } else {
      res.status(200).json({ status: true, data: result});
      console.log('Success in creating user'); 
    }
  })
}

exports.update = function (req,res) {
  const username = req.body.username;

  const updateUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  };

  User.findOneAndUpdate({username: username}, updateUser, { new: true }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err});
      console.log(`Problem in updating user`, err);
    } else {
      res.status(200).json({ status: true, data: result});
      console.log('Success in updating user'); 
    }
  });
};

exports.delete = function (req, res) {

  const username = req.params.username;

  console.log("Delete user", username);

  User.findOneAndDelete({ username: username}, (err, result)=>{
    if (err) {
      res.status(400).json({ status: false, data: err});
      console.log(`Problem in deleting user`, err);
    } else {
      res.status(200).json({ status: true, data: result});
      console.log('Success in deleting user'); 
    }
  })

}
