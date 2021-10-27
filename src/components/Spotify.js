import React, { useEffect } from "react";
import useAuth from "../services/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyService from "../services/spotifyService";




const Spotify = ({ code, setUser, setAccessToken, setPlaylists }) => {

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
    console.log("token is: " + spotifyApi.getAccessToken());
    
    spotifyApi.getMe().then((data) => { // Get user details with help of getMe() function
      setUser(data.body);
     
     
    spotifyService.checkForUser(data.body.id)
    .then(response => {
      if(!response){
        spotifyService.createUser(data.body.id)
      } 
    })
      
      
      spotifyApi.getUserPlaylists(data.body.id).then((data) => { // Obtain public playlists for a user and push them to an array
        data.body.items.map((item) =>
          spotifyApi.getPlaylist(item.id).then((data) => {
            userPlaylistArray.push(data.body);
          })
        );
        setPlaylists(userPlaylistArray);
      });
    });
  }, [accessToken]);

  return <></>;
};

export default Spotify;
