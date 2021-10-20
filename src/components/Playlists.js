import React, {useState, useEffect} from "react";
import PlaylistCard from "./PlaylistCard"
import SpotifyWebApi from "spotify-web-api-node";
import { ChevronDownIcon } from "@heroicons/react/solid";

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

    const filterState = (e) => {
        console.log(e.target.value);
        switch(e.target.value) {
            case "Newest": setFormattedPlaylists(formattedPlaylists.sort(function(a, b){return b.timestamp - a.timestamp}));
            console.log(formattedPlaylists)
            case "Oldest":setFormattedPlaylists(formattedPlaylists.sort(function(a, b){return b.timestamp - a.timestamp}));
            console.log(formattedPlaylists)
            case "Ascending likes": setFormattedPlaylists(formattedPlaylists.sort(function(a, b){return a.likes - b.likes}));
            console.log(formattedPlaylists)
            case "Descending likes": setFormattedPlaylists(formattedPlaylists.sort(function(a, b){return b.likes - a.likes}));
            console.log(formattedPlaylists)
        }
    }

    return (
        <div className="grid items-center justify-center mt-10 space-y-10">
            <div className="relative flex flex-row-reverse focus:ring-0 focus:outline-none ring-transparent">
                <ChevronDownIcon className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" />
                <select onChange={filterState} class="border border-gray-400 rounded-lg text-gray-900 h-10 pl-2 pr-10 bg-white hover:border-gray-400 focus:ring-0 focus:outline-none ring-transparent">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Ascending likes</option>
                    <option>Descending likes</option>
                    <option>Favourites</option>
                </select>
            </div>
            {formattedPlaylists.map((list) => {
                    return (
                    <div key={list.id}>
                        <PlaylistCard likeCount={0} pName={list.name} pCreator={list.owner.id} imgSrc={list.images[0].url} /> 
                    </div>
                    )
            })}
        </div>
    );
}

export default Playlists;
