const express = require("express");
const UserRoute = express.Router();
const { verifyToken } = require("../middleware/auth.js")
const { getUser, getUserFriends, addRemoveFriend } = require("../controllers/user.js")
const { register } = require("../controllers/auth.js")

// Todo Task: add verifyToken to change to auth page


UserRoute.post("/register", register);

UserRoute.get("/:id", getUser);

UserRoute.get("/:id/friends", getUserFriends);

UserRoute.patch("/:id/:friendId", addRemoveFriend);

module.exports = UserRoute;