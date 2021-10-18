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

module.exports = apiRouter