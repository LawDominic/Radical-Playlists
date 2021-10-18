import React from 'react';

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
                        <div className="flex px-5 md:px-0">
                            <label className="inline-flex items-center mr-6">
                                <input className="text-green-400 w-8 h-8 focus:ring-green-300 focus:ring-opacity-0 border border-gray-300 rounded" type="checkbox" name="playlistCheckbox" />
                            </label>
                            <a href={list.external_urls.spotify} target="_blank" rel="noreferrer" className="w-full">
                                <div className="relative p-4 bg-white flex space-x-6 rounded-lg shadow-md my-auto">
                                    <div>
                                        <img src={list.images[0].url} alt="playlist" className="h-24 w-24 hidden sm:flex" />
                                    </div>
                                    <div className="-mt-1 sm:mt-1 md:-mt-1">
                                        <h1 className="text-l md:text-xl font-bold text-gray-700 mr-20">
                                            {list.name}
                                        </h1>
                                        {list.tracks.items.slice(0, 3).map((item) => {
                                            return(<p class="text-gray-600 text-sm md:text-base" key={item.uri}><i>{item.track.name}</i> - {item.track.artists[0].name}</p>)
                                        })}
                                    </div>
                                </div>
                            </a>
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