import React, { useState } from 'react';
import UserPlaylists from './UserPlaylists';
import axios from 'axios'

function Upload({userID, isLoggedIn, accessToken}) {
    
    const getPlaylists = (userID) => {
        axios.get(`https://api.spotify.com/v1/me/playlists`, {headers: {Authorization: accessToken}})
            .then(data => console.log(data))
    }
    


    return (
        <div className="container mx-auto">
            {isLoggedIn ?
                <UserPlaylists /> :
                <div className="text-center">You're currently not logged in. Please do so to access this feature.</div>
            }
            {/* <UserPlaylists /> */}
           
        </div>
    )
}

export default Upload