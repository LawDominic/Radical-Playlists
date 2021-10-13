import React from 'react';
import pImg from "../images/pImg.png";

function UserPlaylists({playlists}) {

    const deselectAll = (e) => {
        e.preventDefault();
        var a = document.getElementsByName("playlistCheckbox")
        for (let x of a) {
            x.checked = false
        }
    }
    const playlist = playlists
    console.log(playlists[0])
    console.log(playlist)

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
                            <div className="relative p-4 bg-white flex space-x-6 rounded-lg shadow-md w-full">
                                <div>
                                    <img src={list.images[0].url} className="h-24 w-24" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">
                                        {list.name}
                                    </h1>
                                    {list.tracks.items.slice(0, 3).map((item) => {
                                        return(<p class="text-gray-600 text-sm"><b>Song: </b> {item.track.name} <b>Artist: </b> {item.track.artists[0].name}</p>)
                                    })}
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