const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
//   post_profilepic: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
  cloudinary_id: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    type: Number,
    default: 1,
    required: true,
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

module.exports = mongoose.model("Post", PostSchema);
