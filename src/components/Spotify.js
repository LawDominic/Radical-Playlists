

import React, { useEffect } from "react";
import useAuth from "../services/useAuth";
import SpotifyWebApi from "spotify-web-api-node";



const Spotify = ({code, setUserID, setAccessToken, setPlaylists}) => {

  // Setting the spotifyApi, so that we can use it's functions
  const spotifyApi = new SpotifyWebApi({
    clientId: "7b215911d14245089d73d78055353cb2",
  });

  const accessToken = useAuth(code);
  setAccessToken(accessToken);


  let playlistArray = [];

  useEffect(() => {
    if (!accessToken) return;


    
    // Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again. 
    spotifyApi.setAccessToken(accessToken);
    console.log("token is: " + spotifyApi.getAccessToken());
    // Get user details with help of getMe() function
    spotifyApi.getMe().then(data => {
      console.log(data);
      console.log(data.body.id); //Need to pass back this value
      setUserID(data.body.id);

      spotifyApi.getUserPlaylists(data.body.id)
        .then(data => {

          data.body.items.map( (item) => 
              spotifyApi.getPlaylist(item.id).then( data => {
                   playlistArray.push(data.body);
              })
          )
           setPlaylists(playlistArray);
        })    
    })
  }, [accessToken]);

  return (
    <></>
  );
};

export default Spotify;