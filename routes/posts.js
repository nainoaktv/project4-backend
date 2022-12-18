const express = require('express');
const { verifyToken } = require("../middleware/auth.js")

const { createPost, deletePost, editPost, getFeedPosts, getUsersPosts, likePost } = require("../controllers/post.js");


const PostRoute = express.Router();


// task: add verifytoken to protected routes 


// tested working

// get all posts made by user
PostRoute.get('/:userId/posts', getUsersPosts);

// get all posts 
PostRoute.get('/', getFeedPosts);

// create new post
PostRoute.post('/:userId/create', createPost);

// edit user post 
PostRoute.patch('/:postId/edit', editPost);

// delete user post
PostRoute.delete('/:postId/delete', deletePost);

// update a post to add a like
PostRoute.patch('/:postId/like', likePost);



module.exports = PostRoute;


/* Stuff
===================

// www.helloworld.com/api/posts/:postId
router.get('/:postId', (req, res) => {
    res.send('Post + ', req.params);
});

// /posts/all ===> all posts
// /posts/id ===> specific post with that id
// /posts/create ===> create post

// www.helloworld.com/posts/{userId} - get all posts for a specific user id?
router.get('/:userId', (req, res) => {
    // connect to db
    const result = posts.findAll();
    res.send(result)
})

router.post('/create', () => {
    // create post
})
*/