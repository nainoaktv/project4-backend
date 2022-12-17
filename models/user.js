const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema(
  {
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
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  location: String,
  occupation: String,
},
{ timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);
