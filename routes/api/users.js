// include third party module
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const key = require("../../config/keys").secretOrKey;

// import validation

const userRegisterInput = require("../../validation/register");

const userLoginInput = require("../../validation/login");

// Import models

const User = require("../../models/Users");

require("../../config/passport")(passport);

// @route:  /api/user/register
// Desc:   Test users get
// Access: Admin Only

router.post("/register", (req, res) => {
  const { errors, isValid } = userRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get form values using req name,email and password
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // check wether user exist or not

  User.findOne({
    email: email
  }).then(user => {
    // if user exist return 404  error with message: user already exist
    if (user) {
      errors.email = "User Already exist";
      res.status(404).json(errors);
    } else {
      // if user does  not exist create new user here
      const NewUser = new User({
        name,
        email,
        password
      });
      // before create new user we need to bcryt the password to store securely in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          // push hash password to new user
          NewUser.password = hash;

          // finally save the user
          NewUser.save()
            .then(user => {
              //

              const profileFields = {
                user: user._id
              };
              Profile.findOne({
                user: user._id
              }).then(profile => {
                if (profile) {
                  // Update
                  Profile.findOneAndUpdate(
                    {
                      user: user._id
                    },
                    {
                      $set: profileFields
                    },
                    {
                      new: true
                    }
                  ).then(profile => res.json(profile));
                } else {
                  // Create
                  new Profile(profileFields)
                    .save()
                    .then(profile => res.json(profile));
                }
              });

              //
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});

// @route:  /api/user/login
// Desc:   login to website using email and password
// Access: Public

router.post("/login", (req, res) => {
  const { errors, isValid } = userLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get the input using req email, password from body
  const email = req.body.email;
  const password = req.body.password;

  // check wether email found or not
  User.findOne({
    email: email
  }).then(user => {
    // if user not found we need to show error code: 400 and respose send user:user not found
    if (!user) {
      errors.email = "User Not found";
      return res.status(400).json(errors);
    }
    // if user found means we need to compare given password with database password using bcrypt compare function
    bcrypt.compare(password, user.password).then(isMatch => {
      // if the password is not match we need to return status code 404 not found
      if (!isMatch) {
        errors.password = "password is incorrect";
        return res.status(404).json(errors);
      } else {
        //  if the password match we need to create jsonwebtoken
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          date: user.date
        };
        //   here we sign the jsonwebtoken using below methods
        jwt.sign(
          payload,
          key,
          {
            expiresIn: 3600
          },
          (err, token) => {
            return res
              .json({
                message: "success",
                token: "Bearer " + token
              })
              .catch(console.log(err));
          }
        );
      }
    });
  });
});

// @route:  /api/user/current
// Desc:   get the current user login details
// Access: Private

router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  }
);

module.exports = router;
