// Imports
const User = require('../models/user');

/* READ */

const getUser = async (req, res) => {
    try{
        // grab userid from url /:id param
        const { id } = req.params;

        // find the specific id we just received from the 'User' table
        const user = await User.findById(id);

        // return the specific user entry
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

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
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
const addRemoveFriend = async (req, res) => {
    try {
        // grab user's id and friend id from frontend
        const { id, friendId } = req.params;

        // find user's table + friend's table for user's ID and friend's ID
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        // if user's friends list does not contain friendID, 
        // if friend's friend list does not contain user's ID
        if (user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
    
        const formattedFriends = friends.map(
            ({ _id, name, occupation, location, profile_pic }) => {
                return { _id, name, occupation, location, profile_pic };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


// Exports
module.exports = {
    getUser,
    getUserFriends,
    addRemoveFriend
}


/*

OLD CODE : refactored and moved to auth controller
------------

// to be moved to routes
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /profile');
    console.log(req.body);
    console.log('====> user')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ id, name, email });
});

router.get('/messages', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log('====> inside /messages');
    console.log(req.body);
    console.log('====> user')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    const messageArray = ['message 1', 'message 2', 'message 3', 'message 4', 'message 5', 'message 6', 'message 7', 'message 8', 'message 9'];
    const sameUser = await User.findById(id);
    res.json({ id, name, email, message: messageArray, sameUser });
});


router.post('/signup', (req, res) => {
    // POST - adding the new user to the database
    console.log('===> Inside of /signup');
    console.log('===> /register -> req.body',req.body);

    User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exists, a user will come back
        if (user) {
            // send a 400 response
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            // Create a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Salt and hash the password - before saving the user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log('==> Error inside of hash', err);
                    // Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json({ user: createdUser}))
                    .catch(err => {
                        console.log('error with creating new user', err);
                        res.json({ message: 'Error occured... Please try again.'});
                    });
                });
            });
        }
    })
    .catch(err => { 
        console.log('Error finding user', err);
        res.json({ message: 'Error occured... Please try again.'})
    })
});

router.post('/login', async (req, res) => {
    // POST - finding a user and returning the user
    console.log('===> Inside of /login');
    // find out what req.body returns
    console.log('===> /login -> req.body', req.body);

    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
        // user is in the DB
        let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        console.log('Does the passwords match?', isMatch);
        if (isMatch) {
            // if user match, then we want to send a JSON Web Token
            // Create a token payload
            // add an expiredToken = Date.now()
            // save the user
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name
            }

            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    res.status(400).json({ message: 'Session has endedd, please log in again'});
                }
                const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 });
                console.log('===> legit', legit);
                res.json({ success: true, token: `Bearer ${token}`, userData: legit });
            });

        } else {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }
    } else {
        return res.status(400).json({ message: 'User not found' });
    }
});

*/