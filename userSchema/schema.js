const mongoose = require('mongoose')
const npmValidator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        type: String,
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
    },
    tokens: [{
        token: {
            type: String
        }
    }]
    
})

userSchema.methods.accessToken = async function () {
    try {
        const token = jwt.sign({id: this._id}, process.env.PRIVATE_KEY)
        this.tokens = this.tokens.concat({token})

        // await this.save()
        return token
    } catch (error) {
        console.log(error);
        
    }
}

userSchema.methods.refreshToken = async function () {
    try {
        const token = jwt.sign({id: this._id}, process.env.PRIVATE_KEY)
        this.tokens = this.tokens.concat({token})

        // await this.save()
        return token
    } catch (error) {
        console.log(error);
        
    }
}



userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = await bcrypt.hash(this.password, 10)
            next()
        } catch (error) {
            next(error)
        }
    } else{
        return next()
    }
} )



const AppUser = mongoose.model('appuser', userSchema)

module.exports = AppUser
