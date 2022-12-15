// Imports
require("dotenv").config()
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
// const router = express.Router();

require("./config/passport")(passport);

const PostRoute = require("./controllers/post");

// App Set up
const app = express();


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());



const db = mongoose.connection;

db.once("open", () => {
  console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on("error", (error) => {
  console.log(`Database Error: ${error}`);
});

// API Routes
app.get("/", (req, res) => {
  res.json({
    name: "MERN Auth API",
    greeting: "Welcome to the our API",
    author: "YOU",
    message: "Smile, you are being watched by the Backend Engineering Team",
  });
});

app.use("/examples", require("./controllers/example"));
app.use("/users", require("./controllers/user"));
app.use("/posts", PostRoute);


// Database Set Up
const PORT = process.env.PORT || 8000;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen( () => console.log(`Server Running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
