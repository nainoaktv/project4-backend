const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }]
},
{ timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
