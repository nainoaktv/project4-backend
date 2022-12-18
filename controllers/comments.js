const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comments");

/* CREATE COMMENT */
const createComment = async (req, res) => {
  try {
    console.log("test");
    // grab postID from url
    const { postId } = req.params;

    // capture values of the following from frontend (req.body)
    const { userId, content } = req.body;

    // check 'User' table to see if returned userId matches an entry in table
    const getUser = await User.findById(userId);
    const getPost = await Post.findById(postId);

    console.log(" author of comment ID " + getUser._id);
    console.log(" post ID" + getPost._id);

    if (!content)
      return res.status(404).json({ message: "Missing post content" });

    if (!getPost) 
      return res.status(404).json({ message: "No post found" });

    const newComment = new Comment({
      author_id: getUser._id,
      post_id: getPost._id,
      display_name: getUser.display_name,
      content,
      likes: [],
    });

    // save post to db
    await newComment.save();

    const updatePost = await Post.findByIdAndUpdate(
      getPost._id,
      { $push: 
        { comments: newComment._id }
      },
    )

    // update newsfeed with updated Post table which includes our new post
    // const post = await Post.find();

    res.status(201).json(newComment._id);
  } catch (err) {
    // 409: Conflict response status code indicates a request conflict with the current state of the target resource.
    res.status(409).json({ message: err.message });
  }
};

module.exports = {
  createComment,
};
