require('dotenv').config()

const express = require('express')
const Playlist = require("../models/playlists")
const cors = require('cors')
const spotifyWebApi = require('spotify-web-api-node')


// const apiRouter = express.Router();


const apiRouter = express()


apiRouter.use(cors()) // To handle cross-origin requests
apiRouter.use(express.json()); // To parse JSON bodies

const credentials = {
  clientId:'ada1fd60bef74c76b3e699ac0282da8d',
  clientSecret: '2cc01b996a5a4a61bc635ffdacaaeb63',
  redirectUri: 'http://localhost:3000/'
};


apiRouter.get('/', (req, res) => {
    console.log('Hello World!')
})

apiRouter.get('/playlists', (req, res) => {
    Playlist.find({}).then(result => {

        //Iterate over result and make it usable for Playlists.js



        res.json(result)
    })
})

apiRouter.post('/login', (req,res) => {
    //  setup 
        let spotifyApi = new spotifyWebApi(credentials)
    
    //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
        const code = req.body.code
    
        // Retrieve an access token
        spotifyApi.authorizationCodeGrant(code).then((data) => {
    
            // Returning the User's AccessToken in the json formate  
            res.json({
                accessToken: data.body.access_token,
            }) 
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400)
        })
    
    })
    
apiRouter.post('/upload', (req, res) => {

    const body = req.body
    
    if(body.length === 0){ 
        return res.status(400).json({
            error: 'No playlists selected'
        })
    }

    for(let playlist of body) {

        const newPlaylist = new Playlist({
            playlistID: playlist,
            timestamp: Date.now(),
            likes: 0
        })

        newPlaylist.save().then(result => {
            console.log("playlist saved");
        })
    }
})


apiRouter.put('/likes/:id', (req, res) => {
    const playlistID = req.params
    const newLikes = req.body
    console.log("Here")
    console.log(newLikes);
    res.json(newLikes)
})



module.exports = apiRouter