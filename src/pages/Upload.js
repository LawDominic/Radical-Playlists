import React from 'react';
import UserPlaylists from '../components/UserPlaylists';

function Upload({userID, isLoggedIn, playlists, updateFn}) {
    
    return (
        <div className="container mx-auto h-full">
            {isLoggedIn ?
                <UserPlaylists playlists={playlists} updateFn={updateFn}/> :
                <div className="text-center">You're currently not logged in. Please do so to access this feature.
                </div>
                
            }
        </div>
    )
}

export default Upload