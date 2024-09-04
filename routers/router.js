const express = require('express')
const router = express.Router()
const indexPageController = require('../controllers/index')
const registrationPageController = require('../controllers/registration')
const loginPageController = require('../controllers/login')

router.get( '/', indexPageController.getIndexpage)
router.get( '/register', registrationPageController.getRegistrationPage)
router.get( '/login', loginPageController.getLoginPage )


router.post('/register', registrationPageController.postUserData)
router.post('/login', loginPageController.postLoginData)

module.exports = router
