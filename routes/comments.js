const express = require("express");
const { model } = require("mongoose");
const {
  createComment,
  editComment,
  deleteComment,
  likeComment,
} = require("../controllers/comments.js");
const { verifyToken } = require("../middleware/auth.js");

const commentRoute = express.Router();

// CREATE a comment
commentRoute.post("/:postId/create", verifyToken, createComment);

// UPDATE a comment
commentRoute.patch("/:commentId/edit", verifyToken, editComment);

// DELETE a comment
commentRoute.delete("/:commentId/delete", verifyToken, deleteComment);

// update a Comment to add a like
commentRoute.patch("/:commentId/like", verifyToken, likeComment);

module.exports = commentRoute;
