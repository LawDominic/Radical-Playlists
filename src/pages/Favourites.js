import React, { useEffect, useState } from "react";

import SpotifyWebApi from "spotify-web-api-node";

import { ChevronDownIcon } from "@heroicons/react/solid";

import PlaylistCard from "../components/PlaylistCard";

import {loginUrl} from '../services/spotifyService'

import bg from "../images/bg.jpg";

function Favourites({playlists, accessToken, user}) {
    
    const [formattedPlaylists, setFormattedPlaylists] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "7b215911d14245089d73d78055353cb2", 
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
        <div>
        {accessToken ?
            <div className="grid items-center justify-center mt-10 space-y-10">
                <div className="relative flex flex-row-reverse focus:ring-0 focus:outline-none ring-transparent">
                    <ChevronDownIcon className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" />
                    
                    <select onChange={filterState} class="border border-gray-400 rounded-lg text-gray-900 h-10 pl-2 pr-10 focus:ring-0 focus:outline-none ring-transparent">
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Ascending likes</option>
                        <option>Descending likes</option>
                    </select>
                </div>
                
                {formattedPlaylists.map((list) => {
                    return (
                        <div key={list.id}>
                            <PlaylistCard likeCount={list.likes} pName={list.name} pCreator={list.owner.id} imgSrc={list.images[0].url} playlistID={list.id} user={user} updateFormat={updatePlaylist} accessToken={accessToken}/> 
                        </div>
                    )
                })}
            </div>
            :
            <div className="bg-gray-900 relative">
                <div className="w-full h-screen bg-no-repeat bg-cover opacity-20" style={{backgroundImage: `url(${bg})`}}/>
                
                <div className="absolute inset-0 flex justify-center items-center flex-col">
                    <p className="text-xl text-white mt-4">Please login to access this section.</p>
                    
                    <a href={loginUrl} className="justify-end text-white hover:text-green-500 transition duration-300">
                        <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:shadow-2xl hover:bg-green-600 mt-4">
                            <p className="font-semibold">Login</p>
                        </button>
                    </a>
                </div>
            </div>
        }
        </div>
    );
}

export default Favourites;
