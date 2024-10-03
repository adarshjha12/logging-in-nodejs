const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000 
const path = require('path')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const router = require('../routers/router')
require('../db/connection')
require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
require('../config/passport')

const crypto = require('crypto')


const staticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(staticPath))
app.use(cookieParser())

const secretKey = crypto.randomBytes(32).toString('hex')

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30000
    }
}))



// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(router)

app.listen(PORT, () =>{
    console.log('server is running');
    
})