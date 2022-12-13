const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    bio: {
        type:String,
        default: "Hello everyone!"
    }
})

module.exports = mongoose.model("Profile", ProfileSchema);