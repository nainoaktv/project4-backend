const mongoose = require("mongoose");

const User = require("./models/user.js");
const { post } = require("./routes/auth.js");
// const Post = require('./models/post.js');

/* SCHEMA HAS BEEN MODIFIED; TO RE-SEED, PLEASE ADJUST FIELDS ACCORDINGLY TO SCHEMA */
const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const users = [
  {
    _id: userIds[0],
    name: "Number One",
    display_name: "Sam Sung",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberone@gmail.com",
    password: "password",
    friends: [],
    location: "Somewhere",
    occupation: "blowing up phones",
    __v: 0,
  },
  {
    _id: userIds[1],
    name: "Number Two",
    display_name: "Aah Chu",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numbertwo@gmail.com",
    password: "password",
    friends: [],
    location: "Nose",
    occupation: "Air",
    __v: 0,
  },
  {
    _id: userIds[2],
    name: "Number Three",
    display_name: "Pika Chu",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberthree@gmail.com",
    password: "password",
    friends: [],
    location: "pokeball",
    occupation: "Eater of foods",
    __v: 0,
  },
  {
    _id: userIds[3],
    name: "Number Four",
    display_name: "Squirt Le",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberfour@gmail.com",
    password: "password",
    friends: [],
    location: "pocket",
    occupation: "water",
    __v: 0,
  },
  {
    _id: userIds[4],
    name: "Number Five",
    display_name: "Bulb Asaur",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberfive@gmail.com",
    password: "password",
    friends: [],
    location: "The Bushes",
    occupation: "Bulbulator",
    __v: 0,
  },
  {
    _id: userIds[5],
    name: "Number Six",
    display_name: "Char Mander",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numbersix@gmail.com",
    password: "password",
    friends: [],
    location: "Toronto",
    occupation: "Fire Starter",
    __v: 0,
  },
  {
    _id: userIds[6],
    name: "Number Seven",
    display_name: "Mew Two",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberseven@gmail.com",
    password: "password",
    friends: [],
    location: "Lost",
    occupation: "Derp",
    __v: 0,
  }
];

// const posts = new post(
//   {
//     _id: new mongoose.Types.ObjectId(),
//     userId: userIds[1],

// },
// )

// newUser();

module.exports = {
  users,
};
