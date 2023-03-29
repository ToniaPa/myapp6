const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
require("dotenv").config(); //για να διαβάσει το .env αρχείο στο myapp6

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const cors = require("cors");
app.use(
  cors({
    origin: "*", //δες παρακάτω σχόλιο
    //origin: ["http://www.section.io", "https://www.google.com"] //του λέω ποιά sites επιτρέπω και έτσι δεν ισχύει γι'αυτά το same-origin policy
  })
);

app.use("/", express.static("files"));

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI, //θέλουμε να διαβάσει την μεταβλητή MONGODB_URI του .env αρχείου
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
const user = require("./routes/user.routes"); //δεν χρειάζετι να βάλουμε το extension δηλ το .js
const userProduct = require("./routes/user.product.routes");

app.use("/api/userproducts", userProduct);

app.use("/api/user", user);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

app.listen(port, () => {
  console.log(`Server is listening in port ${port}`);
});
