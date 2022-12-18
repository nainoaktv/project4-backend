const mongoose = require("mongoose");
// const Comment = require('../models/comments');
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


/* MIDDLEWARE */

//delete comments relating to postId before deleting posts
// PostSchema.pre('remove', async function (next) {
//   const post = this


//   // find comments with matching post_id and remove
//   await Comment.deleteMany({ post_id: post._id });
// })

module.exports = mongoose.model("Post", PostSchema);
