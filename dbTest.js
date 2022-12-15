const User = require('./models/user');

const newUser = new User({
    name: "Sam Shaffer",
    username: "Numba Juan",
    profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    email: "numberone@gmail.com",
    password: "password",
})

// newUser();