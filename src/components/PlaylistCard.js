import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import { PlusCircleIcon } from "@heroicons/react/outline";

import playlistService from "../services/spotifyService";

function PlaylistCard({likeCount, pName, pCreator, imgSrc, playlistID, user, updateFormat}) {
    
    const [likes, setLikes] = useState(likeCount);
    const [bookmarkBool, setBookmarkBool] = useState(false);
    const [addBool, setAddBool] = useState(false);
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
            axios.post("http://localhost:8888/favourites", {userID, playlistID})
            .then(response => response.data)
        } else {          // Remove favourite
            axios.delete(`http://localhost:8888/favourites/${userID}/${playlistID}`)
            .then(response => response.data);
        }
        setBookmarkBool(!bookmarkBool);
    };

    // Adds the playlist to the users spotify account - Need to implement
    const add = (e) => {
        console.log(user)
        e.preventDefault();
        setAddBool(!addBool);
    };


    
    useEffect(() => {
        const userID = user.id;
        axios.get(`http://localhost:8888/favourites/${userID}`)
        .then(response => {
            if(response.data.favoritePlaylists.includes(playlistID)){
                setBookmarkBool(true)
            }
        });
    }, [])
    

    return (
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
                    <a target="_blank"rel="noreferrer" href={`${basePlaylistURL}/${playlistID}`}>
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
                    <a target="_blank"rel="noreferrer" href={`${basePlaylistURL}/${playlistID}`}>
                        <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">{pName}</h1>
                        <p className="text-gray-600 text-sm italic">{pCreator}</p>
                    </a>
                </div>
            </div>
    )
}

export default PlaylistCard;