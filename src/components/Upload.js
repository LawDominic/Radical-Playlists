import React from 'react';
import UserPlaylists from './UserPlaylists';

function Upload({userID, isLoggedIn, playlists}) {
    
    return (
        <div className="container mx-auto h-full">
            {isLoggedIn ?
                <UserPlaylists playlists={playlists}/> :
                <div className="text-center mt-96">You're currently not logged in. Please do so to access this feature.</div>
            }
        </div>
    )
}

export default Upload