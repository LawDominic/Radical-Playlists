import React, { useState } from 'react';
import UserPlaylists from './UserPlaylists';
import axios from 'axios'

function Upload({userID, isLoggedIn, playlists}) {
    
    return (
        <div className="container mx-auto">
            {isLoggedIn ?
                <UserPlaylists playlists={playlists}/> :
                <div className="text-center">You're currently not logged in. Please do so to access this feature.</div>
            }
            {/* <UserPlaylists /> */}
           
        </div>
    )
}

export default Upload