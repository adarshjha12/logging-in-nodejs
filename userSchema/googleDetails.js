const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: String,
    email: String,
    profileImage: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const GoogleUser = mongoose.model('GoogleUser',userSchema)

module.exports = GoogleUser