const mongoose = require("mongoose");
const { Schema } = mongoose;
const Post = require('../models/post');

const CommentSchema = new Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean
  }
},
{ timestamps: true }
);

/* MIDDLEWARE */
CommentSchema.pre('save', async function (next) {

  const comment = this

  await Post.findByIdAndUpdate(comment.post_id, {
    $push: { comments: comment._id }
  });
})



// mongodb middleware: delete comments from Posts' comment array 
CommentSchema.pre('remove', async function (next) {
  // 'this' references the current document being edited
  const comment = this

  await Post.findByIdAndUpdate(comment.post_id, {
    $pull: { comments: comment._id }
  });
})


module.exports = mongoose.model("Comment", CommentSchema);
