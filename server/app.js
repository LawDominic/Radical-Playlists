require('dotenv').config()

const express = require('express') 
const cors = require("cors")
const apiRouter = require("./controllers/api")

const app = express() 

app.use(cors())
// app.use(express.static('build'))
// app.use(express.json())

//app.use(middleware.requestLogger)
app.use(apiRouter)
//app.use(middleware.errorMiddleware)

module.exports = app