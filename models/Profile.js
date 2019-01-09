const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  currentbranch: {
    type: String
  },
  department: {
    type: String
  },
  designation: {
    type: String
  },
  salary: {
    type: Number
  },
  dateofjoining: {
    type: Date
  },
  dateofbirth: {
    type: Date
  },
  gender: {
    type: String
  },
  maritalstatus: {
    type: String
  },
  bloodgroup: {
    type: String
  },

  mobile: {
    type: Number
  },
  nationality: {
    type: String
  },
  address: {
    type: String
  },
  clopening: {
    type: Number
  },
  clavailed: {
    type: Number
  },
  mlopening: {
    type: Number
  },
  mlavailed: {
    type: Number
  },
  absents: {
    type: Number
  },
  remarks: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
