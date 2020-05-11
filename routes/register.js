const userRouter = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');

//importing the user model
const User = require('../models/User')

userRouter.post('/',
    [
        check('name', 'Name field cannot be empty').not().isEmpty(),
        check('email', 'Please complete email field with valid email').isEmail(),
        check('password', 'password must be at least 8 characters long').isLength({ min  : 8}),
        check('name', 'Name field should contain atleast 10 characters').isLength({ min  : 10})
    ],

    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ error : errors.array()})
        }
   
        const { name, email, password, } = req.body
        
       
        
        try {
           let user = await User.findOne({email})
            
            if (user) {
                return res.status(400).json({msg : 'User Already exists'})
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });


            user = new User({  
                name,
                email,
                password,
                avatar,
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
           
            await user.save()  

            const payload = {
                user: {
                    id:user.id
                }
            }
       
            jwt.sign(payload, process.env.SECRET, {
                expiresIn:36000
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
