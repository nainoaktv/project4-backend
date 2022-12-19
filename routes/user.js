const express = require("express");
const UserRoute = express.Router();
const { verifyToken } = require("../middleware/auth.js")
const { getUser, getUserFriends, addRemoveFriend } = require("../controllers/user.js")
const { register } = require("../controllers/auth.js")

// Todo Task: add verifyToken to change to auth page

// create
UserRoute.post("/register", register);

// read
UserRoute.get("/:id", verifyToken, getUser);

// get user's friends (read)
UserRoute.get("/:id/friends", verifyToken, getUserFriends);

// update - add/remove friend from friends list
UserRoute.patch("/:id/:friendId", verifyToken, addRemoveFriend);

module.exports = UserRoute;