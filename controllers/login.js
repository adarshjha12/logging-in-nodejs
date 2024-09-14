const AppUser = require('../userSchema/schema')
const bcrypt = require('bcryptjs')


exports.getLoginPage = function (req, res) {
    res.render('login')
}

exports.postLoginData = async function (req, res) {
    const userEmail = req.body.email
    const password = req.body.password

    try {
        const findUser = await AppUser.findOne({email: userEmail})

        if (!findUser) {
            res.send('cannot find you')
        }

        const matchPassword = await bcrypt.compare(password, findUser.password)
        if (matchPassword === true) {
            console.log('login success');

            //generating tokens
            const accessToken = findUser.accessToken()
            const refreshToken = findUser.refreshToken()

            res.cookie('jwt', accessToken, {
                maxAge: 15 * 60 * 1000, httpOnly: true ,
                httpOnly: true
            })

            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true 
            })

            res.redirect('/')
        } else{
            res.send('invalid details')
        }
        

    } catch (error) {
        console.log(error);
        
    }
}

