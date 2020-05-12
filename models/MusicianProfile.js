const mongoose = require('mongoose');


const musicianProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : true
    },
    stageName: {
        type: String,
    },
    phone: {
        type: String,
    },

    gender: {
        type: String,
        required : true
    },
    age: {
        type: Number,
        required : true
    },
    musicStyle: {
        type: String,
        required: true
    },
    
    location: {
        type: String,
        required: true
    },  
   
    recordLabel: {
        type: String,    
    },
   
    website: {
        type: String
    },
   
    bio: {
        type: String
    }, 
    
     youtube: {
        type: String
       },
        
    twitter: {
        type: String
        },
     facebook: {
         type: String
        },
    linkedin: {
        type: String
        },
     instagram: {
        type: String
    },
     
     date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', musicianProfileSchema);
