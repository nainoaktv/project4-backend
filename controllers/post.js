const User = require("../models/user");
const Post = require("../models/post");
const { post } = require("../routes/auth");

/* CREATE POST */
const createPost = async (req, res) => {
  try {
    // capture values of the following from frontend (req.body)
    const { userId } = req.params;
    const { title, content, content_picture_path } = req.body;

    // check 'User' table to see if returned userId matches an entry in table
    const user = await User.findById(userId);

    const newPost = new Post({
      author_id: user._id,
      display_name: user.display_name,
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
    // const post = await Post.find();

    res.status(201).json(newPost._id);
  } catch (err) {
    // 409: Conflict response status code indicates a request conflict with the current state of the target resource.
    res.status(409).json({ message: err.message });
  }
};

/* READ POST TABLE for our feed in main */
const getFeedPosts = async (req, res) => {
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

const getUsersPosts = async (req, res) => {
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
const likePost = async (req, res) => {
  try {
    // grab relevant values from frontend
    const { postId } = req.params;
    const { userId } = req.body;

    // grab post information of the post that's about to be liked
    const post = await Post.findById(postId);

    // checking to see if the user has liked that post or not by checking if userId exists in array
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // if user liked the post already, delete use from array (unlike)
      post.likes.delete(userId);
    } else {
      // if user has not liked the post, upsert (update the value if it exists in the entry, else create/insert a new user entry into the likes map)
      post.likes.set(userId, true);
    }

    // find the post entry we just made/updated with new like value
    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      { likes: post.likes },
      { new: true }
    );

    // update frontend with updated post object
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* DELETE POST */
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const getPost = await Post.findById(postId);

    if (!getPost) {
      return res.status(404).json({ message: "Cannot delete post: post not found." })
    }

    if (userId === getPost.author_id) {
      getPost.delete(postId);
      res.status(200).json({ message: "Successfully deleted post." });
    } else {
      return res.status(403).json({ message: "You can't do that."})
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


/* EDIT POST */
const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, title, content } = req.body;

    // grab the post made by the user
    const getPost = await Post.findById(postId);

    if (!getPost) {
      return res.status(404).json({ message: "Cannot edit post: post not found." })
    }

    if (userId == getPost.author_id) {
      const updatedPost = await Post.findByIdAndUpdate(
        getPost._id,
        {
          title: title,
          content: content
        }
      );
        // res.status(200).json({ message: "Successfully edit post." });
        res.status(200).json(updatedPost);
    } else {
      return res.status(403).json({ message: "You can't do that."})
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};



module.exports = {
  createPost,
  getUsersPosts,
  editPost,
  deletePost,
  getFeedPosts,
  likePost,
};

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
