const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js")
const { getUser, getUserFriends, addRemoveFriend } = require("../controllers/users.js")

// Task: add verifyToken to change to auth page
router.get("/:id", getUser, function (req, res) {
  res.send("user page");
});

router.get("/:id/friends", getUserFriends, function (req, res) {
  res.send("get user friends");
});

router.patch("/:id/:friendId", addRemoveFriend, function(req, res){
  res.send("update user")
})

module.exports = router;