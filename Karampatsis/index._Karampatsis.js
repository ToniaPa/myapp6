const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err){
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
)

const user = require("./routes/user.routes");
app.use('/api/user', user);

app.listen(port, ()=>{
  console.log(`Server is listening in port ${port}`);
})