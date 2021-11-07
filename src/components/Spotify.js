import React, { useEffect } from "react";

import useAuth from "../services/useAuth";

import SpotifyWebApi from "spotify-web-api-node";

import spotifyService from "../services/spotifyService";

const Spotify = ({ code, setUser, setAccessToken, setPlaylists, allPlaylists }) => {

  // Setting the spotifyApi, so that we can use it's functions
  const spotifyApi = new SpotifyWebApi({
    clientId: "7b215911d14245089d73d78055353cb2",
  });

  const accessToken = useAuth(code);
  
  let userPlaylistArray = [];

  useEffect(() => {
    setAccessToken(accessToken);
    
    if (!accessToken) return;
    
    spotifyApi.setAccessToken(accessToken);
    
    spotifyApi.getMe().then((data) => { // Get user details with help of getMe() function
      setUser(data.body);
    
    spotifyService.checkForUser(data.body.id)
      .then(response => {
        if(!response) {
          spotifyService.createUser(data.body.id)
        } 
    });
        
    spotifyApi.getUserPlaylists(data.body.id).then((res) => { // Obtain public playlists for a user and push them to an array
      let uploadedPlaylists;
      
      spotifyService.checkForUser(data.body.id)
        .then(response => uploadedPlaylists = response.uploadedPlaylists).then(() => {
          for(let item of res.body.items){
            if(!uploadedPlaylists.includes(item.id)){
              spotifyApi.getPlaylist(item.id).then((res) => {
                userPlaylistArray.push(res.body);
              })
            }
          }
        })

      setPlaylists(userPlaylistArray);
    });
  });
  
}, [accessToken, allPlaylists]);

  return <></>;
};

export default Spotify;
