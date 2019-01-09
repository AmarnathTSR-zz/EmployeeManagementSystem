//  Import the external libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

// Include custom Router we created

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const transfer = require("./routes/api/transfer");

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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse application/json
app.use(bodyparser.json());

mongoose
  .connect(
    mongouri,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB connected success"))
  .catch(err => console.log(err));

// passport middleware added

app.use(passport.initialize());

// include passport stratagy

require("./config/passport")(passport);

// Use our router

app.use("/api/user", users);
app.use("/api/profile", profile);
app.use("/api/transfer", transfer);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//  Assigning the port eg. http://localhost:5000 for local environment for heroku we use process.env.port
const port = process.env.PORT || 5000;

// finally app listen the port 5000
app.listen(port, () => {
  console.log(`Port listen on : ${port}`);
});
