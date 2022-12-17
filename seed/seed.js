const User = require('../models/user.js');

var mongoose = require('mongoose');
// const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const db = mongoose.connection;

// const names = ['a', 'b', 'c', 'd', 'e'];


// const createTestUsers = (numOfUsers) => {
//     for (let i = 0; i < numOfUsers; i++) {
//         const user = new User({
//             name: 
//         })
//     }
    
// }


async function createUser() {
    try {
        const newUser = await User.create({
            name: "Sam Sung",
            display_name: "Number One",
            profile_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
            email: "numberone@gmail.com",
            password: "password",
            location: "Somewhere",
            occupation: "blowing up phones"
        })
    } catch (err) {
        console.log('something wrong: ' + err);
    }
}

createUser();