require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.DB_HOST

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

const playlistSchema = new mongoose.Schema({
    playlistID: String,
    timestamp: Date,
    likes: Number
})

playlistSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



module.exports = mongoose.model('Playlist', playlistSchema)