const mongoose = require('mongoose');


const SongPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    songTitle: {
        type: String,
        require : true   
   },
    albumName: {
        type: String,
        require : true   
   },
    songArtwork: {
        type: String,
        require : true   
    },
    
    music: {
        type: String,
        require : true   
   },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('songPost', SongPostSchema);
