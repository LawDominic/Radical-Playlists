require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { Playlist, User } = require("../models/playlists");

const spotifyWebApi = require("spotify-web-api-node");

const { default: axios } = require("axios");

const apiRouter = express();



apiRouter.use(cors()); // To handle cross-origin requests
apiRouter.use(express.json()); // To parse JSON bodies
apiRouter.use(express.static('build'))
// Spotify Application Information
const credentials = {
  clientId: "ada1fd60bef74c76b3e699ac0282da8d",
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "https://radical-playlists-prod.netlify.app/",
};

// If a user has already logged, we check their accessToken to ensure there is some authentication
const checkAuthentication = authorization => {
 return axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${authorization}`
    }
  })
}

// Get all playlists from database
apiRouter.get("/playlists", (req, res) => {
  Playlist.find({}).then((result) => {
    res.json(result);
  });
});

apiRouter.post("/login", (req, res) => {
  // setup
  let spotifyApi = new spotifyWebApi(credentials);

  // Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
  const code = req.body.code;

  // Retrieve an access token
  spotifyApi.authorizationCodeGrant(code)
    .then((data) => { // Returning the User's AccessToken in the json format
      res.json({
        accessToken: data.body.access_token,
      });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Upload the playlist to the database
apiRouter.post("/upload", (req, res) => {

      const body = req.body;

      if (body.length === 0) {
        return res.status(400).json({
          error: "No playlists selected",
        });
      }
    
      for (let playlist of body.newObject) {
        const newPlaylist = new Playlist({
          playlistID: playlist,
          timestamp: Date.now(),
          likes: 0,
          userID: body.user.id,
        });
    
        newPlaylist.save().then((result) => {
          console.log("playlist saved");
        });
    
        User.findOne({ userID: body.user.id }).then((response) => {
          const newList = response.uploadedPlaylists.concat(playlist);
          User.findOneAndUpdate(
            { userID: body.user.id },
            { uploadedPlaylists: newList }
          ).then((result) => {
            res.json(result);
          });
        });
      }

});

// Update likes of a playlist
apiRouter.put("/likes/:id", (req, res) => {
  const playlistID = req.params;
  const newLikes = req.body;

  Playlist.findOneAndUpdate(
    { playlistID: req.body.playlistID },
    { likes: req.body.newValue }
  ).then((result) => {
    res.json(result);
  });
});

// Gets user account
apiRouter.get("/users/:id", (req, res) => {
  const userID = req.params.id;
  User.findOne({ userID: userID }).then((result) => {
    res.json(result);
  });
});

// Adds a new user to the database
apiRouter.post("/users", (req, res) => {
  const newUser = new User({
    userID: req.body.userID,
    favoritePlaylists: [],
    uploadedPlaylists: [],
  });

  newUser.save().then((result) => {
    console.log("user saved");
  });
});

// Gets user account to handle favouriting
apiRouter.get("/favourites/:userID", (req, res) => {
  User.findOne({ userID: req.params.userID }).then((result) => {
    res.json(result);
  });
});

// Add a favourited playlist to a users account
apiRouter.post("/favourites", (req, res) => {
  User.findOneAndUpdate(
    { userID: req.body.userID },
    { $push: { favoritePlaylists: req.body.playlistID } }
  ).then((result) => {
    res.json(result);
  });
});

// Removes a favourited playlist from an account
apiRouter.delete("/favourites/:userID/:playlistID", (req, res) => {
  checkAuthentication(req.headers.authorization).then((response) => {
    if(response.status === 200) {
    User.findOneAndUpdate(
      { userID: req.params.userID },
      { $pull: { favoritePlaylists: req.params.playlistID } }
    ).then(() => {
      res.status(204).end();
    })} else {
      res.status(401).end();
    }
  }).catch(() => {
    res.status(401).end()
  }) 
});

/**
 * Deletes the all use playlists before deleting the user itself
 * Requires user's access token to successfully complete the request
 */
apiRouter.delete("/users/:userID", (req, res) => {
 checkAuthentication(req.headers.authorization).then(response => {
    if(response.status === 200){
      Playlist.deleteMany({ userID: req.params.userID }).then(() => {
        User.findOneAndDelete({ userID: req.params.userID }, (error, data) => {
          if (error) {
            console.log("Unable to delete account");
          } else {
            console.log("User was able to successfully delete account");
            res.json(data);
          }
        });
      });
    } else {
      res.status(401).end()
    }
  }).catch(() =>{
    res.status(401).end()
  })
  
});



module.exports = apiRouter;
