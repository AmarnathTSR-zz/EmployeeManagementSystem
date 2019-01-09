const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "employee"
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Users = mongoose.model("users", UserSchema);
