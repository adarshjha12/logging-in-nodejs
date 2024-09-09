const express = require('express')
const router = express.Router()
const indexPageController = require('../controllers/index')
const registrationPageController = require('../controllers/registration')
const loginPageController = require('../controllers/login')
const AppUser = require('../userSchema/schema')


router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get( '/', indexPageController.getIndexpage)
router.get( '/register', registrationPageController.getRegistrationPage)
router.get( '/login', loginPageController.getLoginPage )
// router.get( '/api', loginPageController.getApi )

// router.get('/api', async (req, res) =>{
//         try {
//             const user = await AppUser.find()
//             res.status(200).send(user); 
//         } catch (error) {
//             console.log(err);
            
//         }
    
// })


router.post('/register', registrationPageController.postUserData)
router.post('/login', loginPageController.postLoginData)

module.exports = router
