const jwt = require('jsonwebtoken')

const auth = function (req, res, next) {
    const token = req.cookies.jwt || req.header['authorization']

    if (!token) {
       return res.status(401).redirect('/login')
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) =>{
        if (err) {
           return res.status(403).send('invalid token provided')
        }

        req.user = decoded
        
        next()

    })
}

module.exports = auth