// Imports
const User = require("../models/user");

/* READ */

const getUser = async (req, res) => {
  try {
    // grab userid from url /:id param
    const { id } = req.params;

    // find the specific id we just received from the 'User' table
    const user = await User.findById(id);

    // return the specific user entry
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    // grab userid from url /:id param
    const { id } = req.params;

    // grab the specific user using id we just received from the 'User' table
    const user = await User.findById(id);

    // with the User entry found, we look into their friends field array
    // and for each friend within the array, we will look up the friend's userId and search for them
    // within the User table entry and store that entry into the 'friends' const
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // convert the 'friends' array into array of objects
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, profile_pic }) => {
        return { _id, name, occupation, location, profile_pic };
      }
    );
    res.status(202).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const addRemoveFriend = async (req, res) => {
  try {
    // grab user's id and friend id from frontend
    const { userId, friendId } = req.params;

    // find user's table + friend's table for user's ID and friend's ID
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    // if user's friends list does not contain friendID,
    // if friend's friend list does not contain user's ID
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (id) => id.toString() !== friendId.toString()
      );
      friend.friends = friend.friends.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, display_name, occupation, location, profile_pic }) => {
        return { _id, display_name, occupation, location, profile_pic };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Exports
module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
};
