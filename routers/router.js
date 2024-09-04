const express = require('express')
const router = express.Router()
const indexPageController = require('../controllers/index')

router.get( '/', indexPageController.getIndexpage)
router.get( '/register', (req, res) =>{
    res.render('registration')
})

router.get( '/login', (req, res) =>{
    res.render('login')
})

module.exports = router
