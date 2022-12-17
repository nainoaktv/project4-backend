require('dotenv').config();
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));


// connect to db
const db = mongoose.connection;

db.once("open", () => {
  console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on("error", (error) => {
  console.log(`Database Error: ${error}`);
});

const User = require('./models/user.js');
// const Post = require('./models/post.js');


const userIds = [
    new mongoose.Types.ObjectId()
]
const newUser = new User({
    _id: userIds[0],
    name: "Sam Sung",
    display_name: "Number One",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberone@gmail.com",
    password: "password",
    location: "Somewhere",
    occupation: "blowing up phones"
})

// newUser();