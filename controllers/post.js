const express = require("express");
const router = express.Router();

import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE POST */
export const createPost = async (req, res) => {
  try {
    // capture values of the following from frontend (req.body)
    const { userId, description, picturePath } = req.body;

    // check 'User' table to see if returned userId matches an entry in table
    const user = await User.findById(userId);

    const newPost = new Post({
      display_name: user.userId,
      user_profilepic: user.profile_pic,
      location: user.location,
      title,
      content,
      content_picture_path,
      likes: {},
      comments: [],
    });

    // save post to db
    await newPost.save();

    // update newsfeed with updated Post table which includes our new post
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    // 409: Conflict response status code indicates a request conflict with the current state of the target resource.
    res.status(409).json({ message: err.message });
  }
};

/* READ POST TABLE for our feed in main */
export const getFeedPosts = async (req, res) => {
  try {
    // grab all entries from our 'Post' table
    const post = await Post.find();

    // yiss it work
    res.status(200).json(post);
  } catch (err) {
    // something wrong ..
    res.status(409).json({ message: err.message });
  }
};

// get all the posts made by the user for user history in profile?
// nainoa

export const getUsersPosts = async (req, res) => {
  try {
    // obtain userId from parameter passed from the url
    const { userId } = req.params;

    // search db for all posts made by userId
    const userPosts = await Post.find({ userId });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* UPDATE */

export const likePost = async (req, res) => {
  try {
    // grab relevant values from frontend
    const { id } = req.params;
    const { userId } = req.body;

    // grab post information of the post that's about to be liked
    const post = await Post.findById(id);

    // checking to see if the user has liked that post or not by checking if userId exists in array
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // if user liked the post already, delete use from array (unlike)
      post.likes.set(userId, true);
    } else {
      // if user has not liked the post, upsert (update the value if it exists in the entry, else create/insert a new user entry into the likes map)
      post.likes.set(userId, true);
    }

    // find the post entry we just made/updated with new like value
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // update frontend with updated post object
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports = router;

/*
 pseudocode 
=============== */

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
