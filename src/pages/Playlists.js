import React, { useEffect, useState } from "react";

import SpotifyWebApi from "spotify-web-api-node";

import { ChevronDownIcon } from "@heroicons/react/solid";

import PlaylistCard from "../components/PlaylistCard";

function Playlists({playlists, accessToken, user}) {
    
    const [formattedPlaylists, setFormattedPlaylists] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "7b215911d14245089d73d78055353cb2", //might be wrong clientID
    });
    
    const formatPlaylist =   () => {
        if (!accessToken) return;
        
        spotifyApi.setAccessToken(accessToken);
        
        playlists.map((playlist) => {
        spotifyApi.getPlaylist(playlist.playlistID)
            .then((data) => {
                const newItem = data.body
                newItem.likes = playlist.likes
                newItem.timestamp = playlist.timestamp
                setFormattedPlaylists(arr => [...arr, newItem].sort(function(a, b){return new Date(b.timestamp) - new Date(a.timestamp)}) )
            })
        })   
    };

    const updatePlaylist = (listID, type) => {
        const newList = formattedPlaylists
        
        if (type === "like") {
            newList[newList.indexOf(newList.find(playlist => playlist.id === listID))].likes++
        } else if (type === "dislike") {
            newList[newList.indexOf(newList.find(playlist => playlist.id === listID))].likes--
        }
        setFormattedPlaylists(newList)
    }
    
    useEffect(() => {
        formatPlaylist()
    }, [])

    const filterState = (e) => {
        switch(e.target.value) {
            case "Newest": setFormattedPlaylists(formattedPlaylists.slice().sort(function(a, b) {return new Date(b.timestamp) - new Date(a.timestamp)}));
            break;
            case "Oldest":setFormattedPlaylists(formattedPlaylists.slice().sort(function(a, b) {return new Date(a.timestamp) - new Date(b.timestamp)}));
            break;
            case "Ascending likes": setFormattedPlaylists(formattedPlaylists.slice().sort(function(a, b) {return a.likes - b.likes}));
            break;
            case "Descending likes": setFormattedPlaylists(formattedPlaylists.slice().sort(function(a, b) {return b.likes - a.likes}));
            break;
            default: console.log("error occurred")
        }
    }

    return (
        <div className="grid items-center justify-center mt-10 space-y-10">
            <div className="relative flex flex-row-reverse focus:ring-0 focus:outline-none ring-transparent">
                <ChevronDownIcon className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" />
                
                <select onChange={filterState} class="border border-gray-400 rounded-lg text-gray-900 h-10 pl-2 pr-10 focus:ring-0 focus:outline-none ring-transparent">
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
                        <PlaylistCard likeCount={list.likes} pName={list.name} pCreator={list.owner.id} imgSrc={list.images[0].url} playlistID={list.id} user={user} updateFormat={updatePlaylist}/> 
                    </div>
                )
            })}
        </div>
    );
}

export default Playlists;
