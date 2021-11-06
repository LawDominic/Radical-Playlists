import React, {useState, useEffect} from 'react';

import placeholder from "../images/placeholder.png";

import playlistService from "../services/spotifyService";

function UserPlaylists({playlists, updateFn}) {
    
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [availablePlaylists, setAvailablePlaylists] = useState(playlists);

    const [uploadedPlaylists, setUploadedPlaylists] = useState([]);

    const deselectAll = (e) => {
        e.preventDefault();
        var a = document.getElementsByName("playlistCheckbox")
        for (let x of a) {
            x.checked = false
        }
    }

    const updatePlaylists = (event) => {
        console.log(event.target.id)
        if(event.target.checked) {
            setSelectedPlaylists([...selectedPlaylists, event.target.id])
        } else {
            setSelectedPlaylists(selectedPlaylists.filter((item) => item !== event.target.id))
        }
        
    }

    const uploadPlaylists = (e) => {
        e.preventDefault();
        console.log("Playlists getting uploaded: ", selectedPlaylists)
        updateFn(selectedPlaylists)
        setSelectedPlaylists([])
    }

    const filterPlaylists = (e) => {
        var input = e.target.value
        var filtered = []
        
        if (input.length > 0) {
            for (let i = 0; i < playlists.length; i++) {
                const playlistName = playlists[i].name.toLowerCase();
                if (playlistName.includes(input.toLowerCase())) {
                    filtered.push(playlists[i])
                }
            }
            setAvailablePlaylists(filtered)
        } else {
            setAvailablePlaylists(playlists)
        }
    }

    useEffect(() => {

        setAvailablePlaylists(availablePlaylists)
    }, [])

    return (
        <div>
            <div className="text-center mt-4">
                    <input 
                        className="p-2 rounded-md focus:ring-0 focus:ring-black border-none"
                        type="text"
                        placeholder="Search Playlists"
                        onChange={filterPlaylists}
                    />
            </div>
            <div className="grid justify-center mt-10 space-y-10">
                {availablePlaylists.map((list) => {
                    return (
                        <div key={list.id}>
                            <div className="flex px-2 md:px-0">
                                <label className="inline-flex items-center mr-6">
                                    <input id={list.id} className="text-green-400 w-8 h-8 focus:ring-green-300 focus:ring-opacity-0 border border-gray-300 rounded" type="checkbox" name="playlistCheckbox" onChange={updatePlaylists}/>
                                </label>
                                
                                <a href={list.external_urls.spotify} target="_blank" rel="noreferrer" className="w-full">
                                    <div className="relative p-4 bg-white flex space-x-6 rounded-lg shadow-md my-auto">
                                        <div>
                                            <img src={list.images[0] ? list.images[0].url : placeholder} alt="playlist" className="h-24 w-24 hidden sm:flex" />
                                        </div>
                                        
                                        <div className="-mt-1 sm:mt-1 md:-mt-1">
                                            <h1 className="text-l md:text-xl font-bold text-gray-700 mr-20">
                                                {list.name}
                                            </h1>
                                            {list.tracks.items.slice(0, 3).map((item) => {
                                                return (
                                                    <p class="text-gray-600 text-sm md:text-base" key={item.uri}>
                                                        <i>{item.track.name}</i> - {item.track.artists[0].name}
                                                    </p>
                                                )
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
                <button onClick={uploadPlaylists} className="bg-green-500 px-5 py-2 text-white rounded-full hover:bg-green-600">
                    Upload
                </button>
            </div>
        </div>
    )
}

export default UserPlaylists;