import React from 'react';
import {loginUrl} from '../services/spotifyService'
import bg from "../images/bg.jpg"

function Landing() {
    return (
        <div className="bg-gray-900 relative">
            <div className="w-full h-screen bg-no-repeat bg-cover opacity-20" style={{backgroundImage: `url(${bg})`}}/>
            <div className="absolute inset-0 flex justify-center items-center flex-col">
                <p className="text-6xl md:text-8xl text-white font-bold">Welcome!</p>
                <p className="text-l text-center md:text-xl text-white mt-4">Upload and share playlists with Spotify users around the world.</p>
                <a
                    href={loginUrl}
                    className="justify-end text-white hover:text-green-500 transition duration-300"
                >
                <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:shadow-2xl hover:bg-green-600 mt-12">
                    <p className="font-semibold">Login</p>
                </button>
                </a>
            </div>
        </div>
    )
}

export default Landing