import React, {useState, useEffect} from "react";
import PlaylistCard from "./PlaylistCard"

import playlistService from "../services/spotifyService"

function Playlists() {

    const [uploadedPlaylists, setUploadedPlaylist] = useState([])

    useEffect(() => {
        playlistService.getAll()
            .then(response => {
                console.log(response)
                setUploadedPlaylist(response)
            })
    }, [])

    const list = [
        { id: '1', likes: 0, pName: 'Playlist Name', pCreator: 'Playlist Creator' },
        { id: '2', likes: 5, pName: 'Playlist Name', pCreator: 'Playlist Creator' }
    ]   

    return (
        <div className="grid items-center justify-center mt-10 space-y-10">
            {list.map((list) => {
                return (
                    <div key={list.id}>
                        <PlaylistCard likeCount={list.likes} pName={list.pName} pCreator={list.pCreator} />
                    </div>
                )
            })}
        </div>
    );
}

export default Playlists;
