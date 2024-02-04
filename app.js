"use strict";

const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const errorHandler = require('./middlewares/errorHandler')
const userRouter = require('./routes/user')
const folderRoute = require('./routes/folder')
const mongoose = require('mongoose')



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// mongoose.connect(process.env.MONGO_URL)

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

app.use('/api/user', userRouter)
app.use('/', (req, res, next) => {
    console.log('checkin')
    next()
})
app.use('/api/folder', folderRoute)
app.use(errorHandler)

connectDB().then(() => {
    app.listen(PORT, () => {
        try {
            console.log(`SERVER RUNNING ON PORT ${PORT}`)
        } catch (error) {
            console.log(`ERROR WHILE STARTING SERVER ${error}`)
        }
    })
})

