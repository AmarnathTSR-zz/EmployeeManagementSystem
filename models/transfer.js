const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransferSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  department: {
    type: String
  },
  designation: {
    type: String
  },
  branch1: {
    type: String
  },
  branch2: {
    type: String
  },
  branch3: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transfer = mongoose.model("transfer", TransferSchema);
