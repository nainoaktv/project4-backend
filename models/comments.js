const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }]
},
{ timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
