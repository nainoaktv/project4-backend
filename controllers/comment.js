const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

/* CREATE COMMENT */
const createComment = async (req, res) => {
  try {
    // capture values of the following from frontend (req.body)
    const { userId, postId, title, content } = req.body;

    // check 'User' table to see if returned userId matches an entry in table
    const user = await User.findById(userId);
    const post = await Post.findById(postId)

    if (!content && !title)
        return res.status(403).json({ message: "Missing title or post content" })

    const newComment = new Comment({
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
    await newComment.save();

    // update newsfeed with updated Post table which includes our new post
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    // 409: Conflict response status code indicates a request conflict with the current state of the target resource.
    res.status(409).json({ message: err.message });
  }
};
