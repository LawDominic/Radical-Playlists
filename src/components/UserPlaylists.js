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

    return (
        <div>
            <div class="grid justify-center mt-10 space-y-10">
            <div className="flex">
                    <label class="inline-flex items-center mr-6">
                        <input class="text-green-400 w-8 h-8 focus:ring-green-300 focus:ring-opacity-0 border border-gray-300 rounded" type="checkbox" name="playlistCheckbox" />
                    </label>
                    <div class="relative p-4 bg-white flex space-x-6 rounded-lg shadow-md">
                        <div>
                            <img src={`${pImg}`} class="h-24 w-24" />
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-700 mb-1 mr-20">
                                Playlist Name
                            </h1>
                            <p class="text-gray-600 text-sm">Song Name - Song Aasdasdasdasdr</p>
                            <p class="text-gray-600 text-sm">Song Name - Song Artist</p>
                            <p class="text-gray-600 text-sm">Song Name - Song Artist</p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <label class="inline-flex items-center mr-6">
                        <input class="text-green-400 w-8 h-8 focus:ring-green-300 focus:ring-opacity-0 border border-gray-300 rounded" type="checkbox" name="playlistCheckbox" />
                    </label>
                    <div class="relative p-4 bg-white flex space-x-6 rounded-lg shadow-md">
                        <div>
                            <img src={`${pImg}`} class="h-24 w-24" />
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-700 mb-1 mr-20">
                                Playlist Name
                            </h1>
                            <p class="text-gray-600 text-sm">Song Name - Song Ar</p>
                            <p class="text-gray-600 text-sm">Song Name - Song Artist</p>
                            <p class="text-gray-600 text-sm">Song Name - Song Artist</p>
                        </div>
                    </div>
                </div>
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