const userRouter = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authorize = require('../middlewares/authorize')


        

//importing the user model
const User = require('../models/User')



userRouter.get('/', authorize, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error') 
        
    }

})


userRouter.post('/',
    [
        check('email', 'Please complete email field with valid email').isEmail(),
        // check('password', 'password must be at least 8 characters long').isLength({ min: 8 })
        check('password', 'password must be at least 8 characters long').exists()
    ],

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ msg: 'LogIn incorrect' })
            }
    
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return res.status(400).json({ msg : 'Wrong password'})
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 36000
            }, (err, token) => {
                if (err) throw err
                res.send({ token })
            })


        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }

    })




module.exports = userRouter
