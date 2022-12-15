const mongoose = require("mongoose");
const { Schema } = mongoose;
// const validator = require('validator');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  display_name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  friends: [{
    type: Array,
    default: []
  }],
  profile_pic: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate: (value) => {
    //     return validator.isEmail(value)
    // }
  },
  location: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("User", UserSchema);
