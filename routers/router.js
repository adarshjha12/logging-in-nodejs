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
const passport = require('passport')
// router.use(auth)
const staticPath = path.join(__dirname, '../public')

router.use(express.json())
router.use(express.static(staticPath))
router.use(express.urlencoded({extended: true}))

router.get( '/',  indexPageController.getIndexpage)
router.get( '/register', registrationPageController.getRegistrationPage)
router.get( '/login', loginPageController.getLoginPage )

router.post('/register', registrationPageController.postUserData)
router.post('/login', loginPageController.postLoginData)

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'consent' 
}) )

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login', successRedirect: '/'}), (req, res) =>{
    res.redirect('/about')
})

router.get('/about', (req, res) =>{
    if (req.isAuthenticated()) {
        res.render('about')
      } else {
        res.redirect('/login');
      }
})


// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });

module.exports = router
