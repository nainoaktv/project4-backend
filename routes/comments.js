const express = require('express');
const { model } = require('mongoose');
const { createComment, editComment, deleteComment, likeComment } = require('../controllers/comments.js');
const { verifyToken } = require("../middleware/auth.js")

const commentRoute = express.Router();


// CREATE
commentRoute.post('/:postId/create', createComment);


// UPDATE
commentRoute.patch('/:commentId/edit', editComment);


// DELETE
commentRoute.delete('/:commentId/delete', deleteComment);

// update a Comment to add a like
commentRoute.patch('/:commentId/like', likeComment);


module.exports = commentRoute;