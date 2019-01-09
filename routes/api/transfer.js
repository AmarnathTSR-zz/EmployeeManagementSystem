const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateTransferInput = require("../../validation/transfer");

// Load User Model
const User = require("../../models/Users");

// Load Transfer Modal
const Transfer = require("../../models/transfer");

// @route   POST api/transfer
// @desc    Create or edit current user transfer
// @access  Private
router.post(
  "/id/:user_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateTransferInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const transferfields = {};
    if (req.params.user_id) transferfields.user = req.params.user_id;
    if (req.body.department) transferfields.department = req.body.department;
    if (req.body.designation) transferfields.designation = req.body.designation;
    if (req.body.branch1) transferfields.branch1 = req.body.branch1;
    if (req.body.branch2) transferfields.branch2 = req.body.branch2;
    if (req.body.branch3) transferfields.branch3 = req.body.branch3;

    Transfer.findOne({
      user: req.params.user_id
    }).then(transfer => {
      if (transfer) {
        // Update
        errors.email = "User Already applied for transfer";
        res.status(404).json(errors);
      } else {
        // Create
        new Transfer(transferfields)
          .save()
          .then(transfer => res.json(transfer));
      }
    });
  }
);

// @route   GET api/transfer/current
// @desc    Get current users transfer
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Transfer.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "email", "role"])
      .then(transfer => {
        console.log("transfer");
        if (!transfer) {
          errors.transfer = "There is no transfer for this user";
          return res.status(404).json(errors);
        }
        res.json(transfer);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/transfer/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  console.log(errors);
  Transfer.find()
    .populate("user", ["name", "email"])
    .then(transfers => {
      if (!transfers) {
        errors.notransfer = "There are no transfers applied";
        console.log(errors);
        return res.status(404).json(errors);
      }

      res.json(transfers);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/transfer/id/:user_id
// @desc    Get transfer by user ID
// @access  Public

router.get("/id/:user_id", (req, res) => {
  const errors = {};

  Transfer.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "email"])
    .then(transfer => {
      if (!transfer) {
        errors.noprofile = "There is no transfer for this user";
        res.status(404).json(errors);
      }

      res.json(transfer);
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/transfer
// @desc    Delete current user and transfer
// @access  Private
router.delete(
  "/id/:user_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Transfer.findOneAndRemove({
      user: req.params.user_id
    }).then(() => {
      User.findOneAndRemove({
        _id: req.params.user_id
      }).then(() =>
        res.json({
          success: true
        })
      );
    });
  }
);

module.exports = router;
