// Import modules
require("dotenv").config()
const express = require("express");
const cors = require("cors");
// const passport = require("passport");
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// require("./config/passport")(passport);

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments")

// Delete
const User = require('./models/user');
const Post = require('./models/post');
const { users } = require('./dbTest.js');

/* MIDDLEWARE */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// sets the directory of where the image is getting stored, in this case, local directory /assets
app.use("/assets", express.static(__dirname + 'public/assets'));




/* API ROUTES */
app.get("/test", (req, res) => {
  res.json({
    name: "What",
    greeting: "the",
    author: "actual",
    message: "node",
  });
});


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);





/* DATABASE STUFF */

// initialize port
const PORT = process.env.PORT || 8000;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

    /* ADD DATA ONE TIME - REMEMBER TO REMOVE AFTER */
    // User.insertMany(users);
    // Post.insertMany(posts);

  })
  .catch((err) => console.log(err.message));


// connect to db
const db = mongoose.connection;

db.once("open", () => {
  console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on("error", (error) => {
  console.log(`Database Error: ${error}`);
});