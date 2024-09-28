const express = require('express')
const router = express.Router()
const indexPageController = require('../controllers/index')
const registrationPageController = require('../controllers/registration')
const loginPageController = require('../controllers/login')
const aboutPageController = require('../controllers/about')
const AppUser = require('../userSchema/schema')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const path = require('path')

// router.use(auth)
const staticPath = path.join(__dirname, '../public')

router.use(express.json())
router.use(express.static(staticPath))
router.use(express.urlencoded({extended: true}))

router.get('/about', aboutPageController.getAboutPage)
router.get( '/', indexPageController.getIndexpage)
router.get( '/register', registrationPageController.getRegistrationPage)
router.get( '/login', loginPageController.getLoginPage )

router.post('/register', registrationPageController.postUserData)
router.post('/login', loginPageController.postLoginData)



module.exports = router
