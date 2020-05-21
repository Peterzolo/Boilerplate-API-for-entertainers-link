require('dotenv').config()

const mongoose = require('mongoose')

const URL = process.env.url

const connectDatabase = async () => {
    try {
        await mongoose.connect(URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true

            }
        )
        console.log('Successfully connected to MongoDB')
    } catch (err) {
        console.error(err.message)    
        process.exit(1)
    }
}

module.exports = connectDatabase