const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  location: String,
  content_picture_path: String,
  user_profilepic: String,
  likes: {
    type: Map,
    of: Boolean,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ]
},
{ timestamps: true }
);

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
