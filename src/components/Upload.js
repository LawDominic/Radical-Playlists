import React, { useState } from 'react';
import UserPlaylists from './UserPlaylists';

function Upload() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <div className="container mx-auto">
            {/* {isLoggedIn ?
                <UserPlaylists /> :
                <div className="text-center">You're currently not logged in. Please do so to access this feature.</div>
            } */}
            <UserPlaylists />
        </div>
    )
}

export default Upload