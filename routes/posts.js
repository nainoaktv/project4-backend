const express = require('express');
const { verifyToken } = require("../middleware/auth.js")

const { createPost, getFeedPosts, getUsersPosts, likePost } = require("../controllers/post.js");


const router = express.Router();


// task: add verifytoken to protected routes 

router.get('/', getFeedPosts);

router.post('/:userId/create')

router.get('/:userId/posts', getUsersPosts);

router.patch('/:id/like', likePost);



module.exports = router;


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