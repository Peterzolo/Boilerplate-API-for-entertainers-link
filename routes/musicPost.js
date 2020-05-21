const express = require('express')
const musicianRouter = express.Router()
const authorize = require('../middlewares/authorize')
const { check, validationResult } = require('express-validator')
const multer = require('multer')

const uploads = multer({dest : 'upload/'})




const storage = multer.diskStorage({
    destination: function (req, res, callback) {
        callback(null, new Date().toISOString() + file.originalname);

    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);

    }
        
    
}

const upload = multer({
    storage: storage,
    limits: {
    fileSize : 1024*1024*5
    },
    fileFilter:fileFilter
});

const User = require('../models/User');
const MusicianProfile = require('../models/MusicianProfile');
const SongPost = require('../models/SongPost');



musicianRouter.post('/', upload.single('songArtwork'), (req, res, next) => {
    const song = new SongPost({

        _id: new mongoose.Types.ObjectId(),

        songTitle: req.body.songTitle,
        albumName: req.body.albumName,
        music: req.body.music
    });
    song.save()
        .then(result => {
            res.status(200).json({
                message: 'Successfully created',
                createdSong: {
                    songTitle: result.songTitle,
                    albumName: result.albumName,
                    music: result.music,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/musicPost' + result._id
                    }

                }
            });
            
        })
        .catch(err => {
        console.log(err)
    })
    
    
})


module.exports = musicianRouter

