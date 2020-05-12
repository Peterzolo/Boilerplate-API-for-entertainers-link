const express = require('express')
const musicianRouter = express.Router()
const authorize = require('../middlewares/authorize')
const { check, validationResult } = require('express-validator')

const MusicianProfile = require('../models/MusicianProfile')


// Protected route
// api = /artist
// get request

musicianRouter.get('/', authorize, async (req, res) => {
    try {
        const artistProfile = await MusicianProfile.find({ user: req.user.id }).populate(
            'user', ['avatar']);

        if (!artistProfile) {
            return res.status(400).json({ msg: 'artistProfile not found' });
        }

        res.json(artistProfile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// protected route
// Registering artist
// End point === /artist
// post request.
// isMobilePhone(str [, locale [, options]])
// isURL(str [, options])
// isLowercase(str)
// isLength(str [, options])
// isUppercase(str)


musicianRouter.post('/', authorize,
    [
        check('firstName', 'First name field cannot be empty').not().isEmpty(),
        check('firstName', 'First name should have minumum of 5 characters').isLength({ min: 5 }),
        check('lastName', 'Last name field cannot be empty').not().isEmpty(),
        check('lastName', 'Last name should have minumum of 5 characters').isLength({ min: 5 }),
        check('phone', 'Phone contact field cant be empty').not().isEmpty(),
        check('phone', 'Enter a valid phone number').isMobilePhone(),
        check('location', 'location field cannot be empty').not().isEmpty(),
        check('gender', 'gender field cannot be empty').not().isEmpty(),
        check('musicStyle', 'Music Style field cant be empty').not().isEmpty(),
        check('website', 'Not a valid URL').isURL(),
        check('youtube', 'Not a valid URL').isURL(),
        check('facebook', 'Not a valid URL').isURL(),
        check('twitter', 'Not a valid URL').isURL(),
        check('instagram', 'Not a valid URL').isURL(),
        check('twitter', 'Not a valid URL').isURL(),

    ],
    async (req, res) => {
        const showErrors = validationResult(req)
        if (!showErrors.isEmpty()) {
            return res.status(400).json({ error: showErrors.array() })
        }
        const {    
            firstName,
            lastName,
            stageName,
            phone,
            gender,
            age,
            musicStyle,
            location,
            recordLabel,
            website,
            bio,
            youtube,
            twitter,
            instagram,
            linkedIn
        } = req.body

        try {
            let artist = new MusicianProfile({
                user: req.user.id,
                firstName,
                lastName,
                stageName,
                phone,
                gender,
                age,
                musicStyle,
                location,
                recordLabel,
                website,
                bio,
                youtube,
                twitter,
                instagram,
                linkedIn
            })

            artist = await artist.save()
            res.json(artist)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
   
        }
    })


musicianRouter.delete('/:id', authorize, async(req, res) => {
        try {
            let artist = await MusicianProfile.findById(req.params.id)
            if (!artist) {
                return res.status(404).json({msg : ' Artist not found'})
            }
            await MusicianProfile.findByIdAndRemove(req.params.id)
            res.send(' Artist successfully removed')
        } catch (err) {
            console.error(err.message)
            res.status(500).send ('Server Error')
            
        }
})
    

// Updating Artist profile
// protected rout


musicianRouter.put('/:id', authorize, async(req, res) => {
    const {

        firstName,
        lastName,
        stageName,
        phone,
        gender,
        age,
        musicStyle,
        location,
        recordLabel,
        website,
        bio,
        youtube,
        twitter,
        instagram,
        linkedIn

          } = req.body
    const artistUpdate = {
        firstName,
        lastName,
        stageName,
        phone,
        gender,
        age,
        musicStyle,
        location,
        recordLabel,
        website,
        bio,
        youtube,
        twitter,
        instagram,
        linkedIn
    }
    
    try {
        
        let artist = await MusicianProfile.findById(req.params.id)
        if (!artist) {
            return res.status(404).json({message : 'Artist not found'})
        }

        artist = await MusicianProfile.findByIdAndUpdate(req.params.id, { $set: artistUpdate }, { new: true })
        res.send(artist)


    } catch (err) {
        console.error(err.message)
        res.status(5000).send ('Server Error')
        
    }
})








module.exports = musicianRouter