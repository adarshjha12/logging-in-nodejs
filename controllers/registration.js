const AppUser = require('../userSchema/schema')


exports.getRegistrationPage = function (req, res) {
    res.render('registration')
}

exports.postUserData = async function (req, res) {
    
}