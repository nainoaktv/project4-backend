const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.js")
const { getUser, getUserFriends, addRemoveFriend } = require("../controllers/user.js")
const { register } = require("../controllers/auth.js")

// Todo Task: add verifyToken to change to auth page


router.post("/register", register);

router.get("/:id", getUser);

router.get("/:id/friends", getUserFriends);

router.patch("/:id/:friendId", addRemoveFriend);

module.exports = router;