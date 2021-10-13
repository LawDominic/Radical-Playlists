import React from 'react';
import pImg from "../images/pImg.png";

function UserPlaylists() {

    const deselectAll = (e) => {
        e.preventDefault();
        var a = document.getElementsByName("playlistCheckbox")
        for (let x of a) {
            x.checked = false
        }
    }
    const playlist = [
        {id: 'p1', playlistName: 'Playlist Name', s1: 'Song Name - Song Aasdasdasdasdr', s2: 'Song Name - Song Artist', s3: 'Song Name - Song Artist' },
        {id: 'p2', playlistName: 'Playlist Name', s1: 'Song Name - Song Ar', s2: 'Song Name - Song Artist', s3: 'Song Name - Song Artist'} 
    ];

    return (
        <div>
            <div className="grid justify-center mt-10 space-y-10">
                {playlist.map((list) => {
                    return(
                    <div key={list.id}>
                        <div className="flex">
                            <label className="inline-flex items-center mr-6">
                                <input className="text-green-400 w-8 h-8 focus:ring-green-300 focus:ring-opacity-0 border border-gray-300 rounded" type="checkbox" name="playlistCheckbox" />
                            </label>
                            <div className="relative p-4 bg-white flex space-x-6 rounded-lg shadow-md">
                                <div>
                                    <img src={`${pImg}`} className="h-24 w-24" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">
                                        {list.playlistName}
                                    </h1>
                                    <p className="text-gray-600 text-sm">{list.s1}</p>
                                    <p className="text-gray-600 text-sm">{list.s2}</p>
                                    <p className="text-gray-600 text-sm">{list.s3}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className="flex mx-auto items-center justify-center space-x-4 mt-6">
                <button onClick={deselectAll} className="bg-red-500 px-5 py-2 text-white rounded-full hover:bg-red-600">
                    Deselect all
                </button>
                <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:bg-green-600">
                    Upload
                </button>
            </div>
        </div>
    )
}

export default UserPlaylists;