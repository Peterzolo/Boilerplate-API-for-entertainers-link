require('dotenv').config()
const jwt = require('jsonwebtoken')


const authorize = (req, res, next) => {
    const token = req.header('authorized-token')
    if (!token) {
        return res.status(401).json({msg : 'Not allowed'})
    }

 try {
     const uncoded = jwt.verify(token, process.env.SECRET)
     req.user = uncoded.user
     next()

 } catch (err) {
     res.status(401).json({ msg : 'invalid Login token'})  
     
 }

}

module.exports = authorize