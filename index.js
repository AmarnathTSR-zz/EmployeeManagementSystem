//  Import the external libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// Import Keys
const uri = require("./config/keys");
const mongouri = uri.mongoUri;

// Initialize the app
const app = express();
// parse application/x-www-form-urlencoded
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyparser.json());

// connect mongoDB

mongoose
  .connect(
    mongouri,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB connected success"))
  .catch(err => console.log(err));

//  Assigning the port eg. http://localhost:5000 for local environment for heroku we use process.env.port
const port = process.env.PORT || 5000;

// finally app listen the port 5000
app.listen(port, () => {
  console.log(`Port listen on : ${port}`);
});
