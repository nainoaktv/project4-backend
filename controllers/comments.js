const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comments");

/* CREATE COMMENT */
const createComment = async (req, res) => {
  try {
    // grab postID from url
    const { postId } = req.params;

    // capture values of the following from frontend (req.body)
    const { userId, content } = req.body;

    // check 'User' table to see if returned userId matches an entry in table
    const getUser = await User.findById(userId);
    const getPost = await Post.findById(postId);

    if (!content)
      return res.status(404).json({ message: "Missing post content" });

    if (!getPost) return res.status(404).json({ message: "No post found" });

    const newComment = new Comment({
      author_id: getUser._id,
      post_id: getPost._id,
      display_name: getUser.display_name,
      content,
      likes: [],
    });

    // save post to db
    await newComment.save();

    // refactored to comment schema
    // const updatePost = await Post.findByIdAndUpdate(getPost._id, {
    //   $push: { comments: newComment._id },
    // });

    // update newsfeed with updated Post table which includes our new post
    // const post = await Post.find();

    res.status(201).json(newComment._id);
  } catch (err) {
    // 409: Conflict response status code indicates a request conflict with the current state of the target resource.
    res.status(409).json({ message: err.message });
  }
};

// /:commentId/edit
const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const getComment = await Comment.findById(commentId);

    if (!getComment) {
      return res
        .status(403)
        .json({ message: "Unable to edit comment: comment not found" });
    }

    if (userId === getComment.author_id.toString()) {
      const updatedComment = await Comment.findByIdAndUpdate(getComment._id, {
        content: content,
      });
      res.status(200).json({
        message: "Updated comment ID " + getComment._id,
      });
    } else {
      return res.status(403).json({ message: "You can't do that." });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const getComment = await Comment.findById(commentId);

    if (!getComment) {
      return res
        .status(404)
        .json({ message: "Cannot delete comment: comment not found" });
    }

    // userId is already a string, but author_id is stored as an object so either we use
    // == or convert to string in order to use strict comparison
    if (getComment.author_id.toString() === userId) {
      getComment.delete(commentId);
      res.status(200).json({ message: "Successfully deleted comment" });
    } else {
      return res.status(403).json({ message: "You can't do that." });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// '/:commentId/like'
const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const getComment = await Comment.findById(commentId);

    const isLiked = getComment.likes.get(userId);

    if (isLiked) {
      getComment.likes.delete(userId);
    } else {
      getComment.likes.set(userId, true);
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      getComment._id,
      { likes: getComment.likes },
      { new: true }
    );

    res.status(200).json(updatedComment);
    // res.status(200).json({ message: "Successfully updated likes on comment."});
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
  likeComment,
};
