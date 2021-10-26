import React from 'react';
import UserPlaylists from '../components/UserPlaylists';
import {loginUrl} from '../services/spotifyService'
import bg from "../images/bg.jpg"

function Upload({userID, isLoggedIn, playlists, updateFn}) {
    
    return (
        <div>
            {isLoggedIn ?
                <div className=" mx-auto h-full"><UserPlaylists playlists={playlists} updateFn={updateFn}/></div> :
                <div className="bg-gray-900 relative">
                    <div className="w-full h-screen bg-no-repeat bg-cover opacity-20" style={{backgroundImage: `url(${bg})`}}/>
                    <div className="absolute inset-0 flex justify-center items-center flex-col">
                        <p className="text-xl text-white mt-4">Please login to access this section.</p>
                        <a
                            href={loginUrl}
                            className="justify-end text-white hover:text-green-500 transition duration-300"
                        >
                        <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:shadow-2xl hover:bg-green-600 mt-4">
                            <p className="font-semibold">Login</p>
                        </button>
                        </a>
                    </div>
                </div>
            }
        </div>
    )
}

export default Upload