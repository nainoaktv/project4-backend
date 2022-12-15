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
  cloudinary_id: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// likes: {
//   users: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   }],
//   type: Number,
//   default: 1,
//   required: true,
// },
//   post_profilepic: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },

module.exports = mongoose.model("Post", PostSchema);
