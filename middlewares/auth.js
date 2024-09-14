const jwt = require('jsonwebtoken')

const auth = function (req, res, next) {
    const token = req.cookies.refreshToken

    if (!token) {
        res.status(401).send("you don't have access to this page" )
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) =>{
        if (err) {
            res.status(403).send('invalid token provided')
        }

        req.user = decoded
        next()
    })

}

module.exports = auth