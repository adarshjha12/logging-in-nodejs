const AppUser = require('../userSchema/schema')


exports.getLoginPage = function (req, res) {
    res.render('login')
}

exports.postLoginData = function (req, res) {
    
}