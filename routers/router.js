const express = require('express')
const router = express.Router()
const indexPageController = require('../controllers/index')
const registrationPageController = require('../controllers/registration')
const loginPageController = require('../controllers/login')
const aboutPageController = require('../controllers/about')
const refreshTokenController = require('../controllers/refreshToken')
const AppUser = require('../userSchema/schema')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

// router.use(auth)
router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/about', auth, aboutPageController.getAboutPage)
router.get( '/', indexPageController.getIndexpage)
router.get( '/register', registrationPageController.getRegistrationPage)
router.get( '/login', loginPageController.getLoginPage )

router.post('/register', registrationPageController.postUserData)
router.post('/login', loginPageController.postLoginData)


router.post('/refresh-token')

module.exports = router
