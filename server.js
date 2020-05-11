const express = require('express')
const app = express()

const connectDatabase = require('./config/database')
connectDatabase()


app.use(express.urlencoded({   
    extended : true   
}))  
              
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/artist', require('./routes/artist'))
app.use('/musicPost', require('./routes/artist'))
    

const PORT = process.env.PORT || 5000               

   
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 