const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
        return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
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
