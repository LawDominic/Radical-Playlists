import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";

import playlistService from "../services/spotifyService";
import SpotifyWebApi from "spotify-web-api-node";

function PlaylistCard({likeCount, pName, pCreator, imgSrc, playlistID, user, updateFormat, accessToken}) {
    
    const [likes, setLikes] = useState(likeCount);
    const [bookmarkBool, setBookmarkBool] = useState(false);
    const [addBool, setAddBool] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const basePlaylistURL = "https://open.spotify.com/playlist/"

    // Increase the likes of a playlist by 1
    const like = (e) => {
        e.preventDefault();
        playlistService.updateLikes(playlistID, likes+1);
        setLikes(likes + 1);
        updateFormat(playlistID, "like");
    };

    // Decrease the likes of a playlist by 1
    const dislike = (e) => {
        e.preventDefault();
        if (likes === 0) { //Will not allow for a negative number
            playlistService.updateLikes(playlistID, likes)
            setLikes(0);
            
        } else {
            playlistService.updateLikes(playlistID, likes-1)
            setLikes(likes - 1);
            updateFormat(playlistID, "dislike");
        }

    };

    // Allows a playlist to be added as a favourited playlist to a user's account
    const bookmark = (e) => {
        e.preventDefault();
        const userID = user.id;
        if(!bookmarkBool){ // Add favourite
            axios.post("/favourites", {userID, playlistID})
            .then(response => response.data)
        } else {          // Remove favourite
            axios.delete(`/favourites/${userID}/${playlistID}`, {
                headers: {
                    Authorization: accessToken
                }
            })
            .then(response => response.data);
        }
        setBookmarkBool(!bookmarkBool);
    };

    // Adds the playlist to the users spotify account - Need to implement
    const add = (e) => {
        const spotifyApi = new SpotifyWebApi({
            clientId: "7b215911d14245089d73d78055353cb2",
        });
        spotifyApi.setAccessToken(accessToken);
        e.preventDefault();
        setAddBool(!addBool);
        setAddModal(!addModal);
        spotifyApi.followPlaylist(playlistID ,{
            'public' : false // Sets the playlist
          }).then(function(data) {
          }, function(err) {
          });
    };


    
    useEffect(() => {
        const userID = user.id;
        axios.get(`/favourites/${userID}`)
        .then(response => {
            if(response.data.favoritePlaylists.includes(playlistID)){
                setBookmarkBool(true)
            }
        });
    }, [])
    

    return (
        <div>
            <div className="relative p-4 bg-white flex items-center space-x-6 rounded-lg shadow-md">
                <div className="flex flex-col">
                    <button onClick={like} className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center">
                        <ChevronDoubleUpIcon className="h-4 text-gray-900 hover:text-green-600" />
                    </button>

                    <p className="text-center">{likes}</p>
                    
                    <button onClick={dislike} className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center">
                        <ChevronDoubleDownIcon className="h-4 text-gray-900 hover:text-red-600" />
                    </button>
                </div>
                
                <div>
                    <a target="_blank"rel="noreferrer" href={`${basePlaylistURL}${playlistID}`}>
                        <img src={`${imgSrc}`} alt="playlist" className="h-32 w-32 hidden sm:flex" />
                    </a>
                </div>
                
                <div>
                    <button onClick={bookmark}>
                    
                    {bookmarkBool ? (
                            <BookmarkSolidIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 text-red-600 hover:text-gray-900" />
                        ) : (
                            <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 hover:text-red-600" />
                        )}
                    </button>
                    
                    <button onClick={add}>
                        {addBool ? (
                            <CheckIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 text-green-400 hover:text-red-600" />
                        ) : (
                            <PlusCircleIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 hover:text-green-400" />
                        )}
                    </button>
                </div>
                
                <div>
                    <a target="_blank"rel="noreferrer" href={`${basePlaylistURL}${playlistID}`}>
                        <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">{pName}</h1>
                        <p className="text-gray-600 text-sm italic">{pCreator}</p>
                    </a>
                </div>
            </div>
            {addModal ? 
                <div class="flex flex-col min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-90 px-2">
                    <div class="flex flex-col p-8 bg-white rounded-2xl">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                            <CheckCircleIcon className="h-12 w-12 text-green-600 rounded-xl bg-green-100 p-2 mx-auto mb-2 md:mb-0"/>
                            <div class="flex flex-col ml-3">
                                <div class="font-medium leading-none">Success</div>
                                <p class="text-sm text-gray-600 leading-none mt-1">You have added this playlist to your Spotify account as a private playlist.
                                </p>
                            </div>
                        </div>
                        <div className="flex mx-auto items-center justify-center space-x-2 mt-6">
                            <button onClick={() => {setAddModal(false)}} className="bg-green-500 px-5 py-2 text-white rounded-full hover:bg-green-500 shadow-md">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
                : null}</div>
    )
}

export default PlaylistCard;