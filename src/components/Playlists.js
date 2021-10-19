import React, {useState, useEffect} from "react";
import PlaylistCard from "./PlaylistCard"
import SpotifyWebApi from "spotify-web-api-node";
import playlistService from "../services/spotifyService"

//temporary value for likeCount

function Playlists({playlists, accessToken}) {
    
    const [formattedPlaylists, setFormattedPlaylists] = useState([])
   

    const spotifyApi = new SpotifyWebApi({
        clientId: "7b215911d14245089d73d78055353cb2", //might be wrong clientID
    });
    
    const formatPlaylist =   () => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    
        
        playlists.map((playlist) => {
          spotifyApi
            .getPlaylist(playlist.playlistID)
            .then((data) => {
                setFormattedPlaylists(arr => [...arr, data.body])
            })
        })   
      };
    
      

    useEffect(() => {
        formatPlaylist()
    }, [])  
    

    return (
        <div className="grid items-center justify-center mt-10 space-y-10">
            {formattedPlaylists.map((list) => {
                
                    return (
                    <div key={list.id}>
                        <PlaylistCard likeCount={0} pName={list.name} pCreator={list.owner.display_name} imgSrc={list.images[0].url} /> 
                        
                    </div>
                    )
               
            })}
        </div>
    );
}

export default Playlists;
