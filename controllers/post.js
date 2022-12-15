const express = require('express');
const router = express.Router();
const posts = require('../models/Post');

// import the posts model

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


// ApiCalls.js
// const getAllPosts = (postId) => {
//     let url = `www.helloworld.com/api/posts/${postId}`;
//     const { data } = axios.get(url);
//     return data.response;
// }

// import { getAllPosts } from 'ApiCalls.js';

// const UserPages = () => {

//     const posts = getAllPosts(id);

//     return (
//         <>
//             {posts.map(post => {
//                 <p>{post.author}</p>
//                 <p>{post.title}</p>
//                 <p>{post.content}</p>
//                 <p>{post.likes}</p>
//             })}
//         </>
//     )
// }


// PostController
// function getAll(req, res) {
//     // use the req params (postId)
//     // import post model from your schema
//     // const postResult = post.findAll({ postId })
//     // send back postResult ==>
//     /* 
//      {
//         author: {},
//         title: "",
//         content: "",
//      }
//      === res.send(postResult);
//     */
//     res.send(req.params);
// }

module.exports = router