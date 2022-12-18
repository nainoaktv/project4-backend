const express = require('express');
const { model } = require('mongoose');
const { createComment } = require('../controllers/comments.js');
const { verifyToken } = require("../middleware/auth.js")

const commentRoute = express.Router();


// CREATE
commentRoute.post('/:postId/create', createComment);


// UPDATE
commentRoute.patch('/:commentId/edit');



// DELETE
commentRoute.delete('/:commentId/delete');



module.exports = commentRoute;