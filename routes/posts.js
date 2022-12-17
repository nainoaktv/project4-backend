const express = require('express');
import { verifyToken } from '../middleware/auth.js';

import { getFeedPosts, getUserPosts, likePost } from "../controllers.post.js";


const router = express.Router();


// task: add verifytoken to protected routes 
router.get('/', getFeedPosts);
router.get('/:userId/posts', getUserPosts);


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