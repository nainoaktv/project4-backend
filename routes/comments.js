const express = require('express');
const { model } = require('mongoose');
const { createComment, deleteComment } = require('../controllers/comments.js');
const { verifyToken } = require("../middleware/auth.js")

const commentRoute = express.Router();


// CREATE
commentRoute.post('/:postId/create', createComment);


// UPDATE
commentRoute.patch('/:commentId/edit');



// DELETE
commentRoute.delete('/:commentId/delete', deleteComment);



module.exports = commentRoute;