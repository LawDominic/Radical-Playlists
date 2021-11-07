import React, { useEffect, useState } from "react";

import SpotifyWebApi from "spotify-web-api-node";

import { ChevronDownIcon } from "@heroicons/react/solid";

import FavouritePlaylistCard from "../components/FavouritePlaylistCard";

import {loginUrl} from '../services/spotifyService'

import bg from "../images/bg.jpg";
import axios from "axios";

function Favourites({ accessToken, user}) {
    
    const [playlists, setPlaylists] = useState([]);
    const [formattedPlaylists, setFormattedPlaylists] = useState([])

    const spotifyApi = new SpotifyWebApi({
        clientId: "7b215911d14245089d73d78055353cb2", 
    });

    const formatPlaylist =   () => {
        if (!accessToken) return;
        
        spotifyApi.setAccessToken(accessToken);
        
        playlists.map((playlist) => {
            console.log(playlist)
        spotifyApi.getPlaylist(playlist)
            .then((data) => {
                const newItem = data.body
                setFormattedPlaylists(arr => [...arr, newItem]) 
            })
        })   
    };


    useEffect(() => {
        formatPlaylist()
    }, [playlists])

  
    useEffect(() => {
        if(user)
        return axios.get(`/favourites/${user.id}`)
                .then(response => setPlaylists(response.data.favoritePlaylists))
      }, [user])

 

    return (
        <div>
        {accessToken ?
            <div className="grid items-center justify-center mt-10 space-y-10">
               {playlists.length !== 0 ?  formattedPlaylists.map((list) => {
                    return (
                        <div key={list.id}>
                             <FavouritePlaylistCard pName={list.name} pCreator={list.owner.id} imgSrc={list.images[0].url} playlistID={list.id} user={user}  accessToken={accessToken}/> 
                            
                        </div>
                    ) 
                }) : <p className="text-xl text-black mt-4">You haven't added any favourites yet</p> }
                
               
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
