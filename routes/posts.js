const express = require('express');
const { verifyToken } = require("../middleware/auth.js")

const { createPost, deletePost, editPost, getFeedPosts, getUsersPosts, likePost } = require("../controllers/post.js");


const PostRoute = express.Router();



// get all posts made by user
PostRoute.get('/:userId/posts', verifyToken, getUsersPosts);

// get all posts - only when logged in
PostRoute.get('/', verifyToken, getFeedPosts);

// create new post
PostRoute.post('/:userId/create', verifyToken, createPost);

// edit user post 
PostRoute.patch('/:postId/edit', verifyToken, editPost);

// delete user post
PostRoute.delete('/:postId/delete', verifyToken, deletePost);

// update a post to add a like
PostRoute.patch('/:postId/like', verifyToken, likePost);



module.exports = PostRoute;
