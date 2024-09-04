const mongoose = require('mongoose')
const npmValidator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate:{
            validator: function (value) {
            return npmValidator.isEmail(value)
        }
      }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate:{
            validator: function (value) {
            return npmValidator.isMobilePhone(value)
        }
      }
    },
    password: {
        type: String,
        required: true
    }
    
})

const AppUser = mongoose.model('appuser', userSchema)

module.exports = AppUser
