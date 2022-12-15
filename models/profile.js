const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  display_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "Hello everyone!",
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
