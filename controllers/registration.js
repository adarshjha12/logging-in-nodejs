const AppUser = require('../userSchema/schema')


exports.getRegistrationPage = function (req, res) {
    res.render('registration')
}

exports.postUserData = async function (req, res) {
    try {
        const postUser = new AppUser({
            username: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })

        postUser.save()
        console.log('signup success');
        
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.send(401, 'server error')
    }
}