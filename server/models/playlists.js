require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_HOST;

console.log("connecting to", url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const playlistSchema = new mongoose.Schema({
  playlistID: String,
  timestamp: Date,
  likes: Number,
  userID: String
});

const userSchema = new mongoose.Schema({
  userID: String,
  favoritePlaylists: Array,
  uploadedPlaylists: Array
});

playlistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    User: User,
    Playlist: Playlist
}
