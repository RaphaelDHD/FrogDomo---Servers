const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/DBFrogDomo_API', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3000, () => console.log('Server started'))
