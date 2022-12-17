const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
require("dotenv").config();


const register = async (req, res) => {
  try {
    // grab the following input from frontend for account creation
    const {
      name,
      display_name,
      profile_pic,
      email,
      password,
      location,
      occupation,
    } = req.body;

    // check if email exists
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res
        .status(400)
        .json({ message: "This email already been registered!" });
    }

    // salt the password
    const salt = bcrypt.genSaltSync(10);

    // take the salt generated password and hash it
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      display_name,
      profile_pic,
      email,
      password: passwordHash,
      location,
      occupation,
    });

    // save user
    const savedUser = await newUser.save(); 

    res.status(201).json(savedUser); // 201 status for user successfully saved
  } catch (err) {
    res.status(500).json({ error: err.message }); // 500 for "idk what happened either"
  }
};

/* LOG IN */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        delete user.password;

        res.status(200).json({ token, user }); // success!

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login
};