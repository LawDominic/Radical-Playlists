import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import pImg from "../images/pImg.png";

import PlaylistCard from "./PlaylistCard"

function Playlists() {
    // let [likes, setLikes] = useState(1);
    // const [bookmarkBool, setBookmarkBool] = useState(false);
    // const [addBool, setAddBool] = useState(false);

    // const like = (e) => {
    //     e.preventDefault();
    //     setLikes(likes + 1);
    // };

    // const dislike = (e) => {
    //     e.preventDefault();
    //     if (likes === 0) {
    //         setLikes(likes = 0);
    //     } else {
    //         setLikes(likes - 1);
    //     }
    // };



    // const bookmark = (e) => {
    //     e.preventDefault();
    //     setBookmarkBool(!bookmarkBool);
    // };

    // const add = (e) => {
    //     e.preventDefault();
    //     setAddBool(!addBool);
    // };

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
                        {/* <div className="relative p-4 bg-white flex items-center space-x-6 rounded-lg shadow-md">
                            <div className="flex flex-col">
                            <button
                            onClick={() => {list.likes = list.likes - 1}}
                            className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
                            >
                                <ChevronDoubleDownIcon className="h-4 text-gray-900 hover:text-red-600" />
                            </button>
                            <p className="text-center">{list.likes}</p>
                            <button
                            onClick={() => {list.likes = list.likes - 1}}
                            className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
                            >
                                <ChevronDoubleDownIcon className="h-4 text-gray-900 hover:text-red-600" />
                            </button>
                            </div>
                            <div>
                            <img src={`${pImg}`} className="h-32 w-32" />
                            </div>
                            <div>
                                <button onClick={bookmark}>
                                {bookmarkBool ? (
                                        <BookmarkSolidIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 text-red-600 hover:text-gray-900" />
                                    ) : (
                                        <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 hover:text-red-600" />
                                    )}
                                </button>
                                <button onClick={add}>
                                    {addBool ? (
                                        <CheckIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 text-green-400 hover:text-red-600" />
                                    ) : (
                                        <PlusCircleIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 hover:text-green-400" />
                                    )}
                                </button>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">
                                    {list.pName}
                                </h1>
                                <p className="text-gray-600 text-sm italic">{list.pCreator}</p>
                            </div>
                        </div> */}
                    </div>
                )
            })}
            {/* <div className="relative p-4 bg-white flex items-center space-x-6 rounded-lg shadow-md"> */}
                {/* <div className="flex flex-col"> */}
                    {/* <button
                        onClick={like}
                        className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
                    >
                        <ChevronDoubleUpIcon className="h-4 text-gray-900 hover:text-green-400" />
                    </button> */}
                    {/* <p className="text-center">{likes}</p> */}
                    {/* <button
                        onClick={dislike}
                        className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
                    >
                        <ChevronDoubleDownIcon className="h-4 text-gray-900 hover:text-red-600" />
                    </button> */}
                {/* </div> */}
                {/* <div>
                    <img src={`${pImg}`} className="h-32 w-32" />
                </div> */}
                {/* <div>
                    {/* <button onClick={bookmark}>
                        {bookmarkBool ? (
                            <BookmarkSolidIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 text-red-600 hover:text-gray-900" />
                        ) : (
                            <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 hover:text-red-600" />
                        )}
                    </button> */}
                    {/* <button onClick={add}>
                        {addBool ? (
                            <CheckIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 text-green-400 hover:text-red-600" />
                        ) : (
                            <PlusCircleIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 hover:text-green-400" />
                        )}
                    </button>
                </div> */} 
                {/* <div>
                    <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">
                        Playlist Name
                    </h1>
                    <p className="text-gray-600 text-sm italic">Playlist Creator</p>
                </div> */}
            {/* </div> */}

            {/* <div className="relative p-4 bg-white flex items-center space-x-6 rounded-lg shadow-md">
                <div className="flex flex-col">
                    <button
                        onClick={like}
                        className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
                    >
                        <ChevronDoubleUpIcon className="h-4 text-gray-900 hover:text-green-400" />
                    </button>
                    <p className="text-center">{likes}</p>
                    <button
                        onClick={dislike}
                        className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
                    >
                        <ChevronDoubleDownIcon className="h-4 text-gray-900 hover:text-red-600" />
                    </button>
                </div>
                <div>
                    <img src={`${pImg}`} className="h-32 w-32" />
                </div>
                <div>
                    <button onClick={bookmark}>
                        {bookmarkBool ? (
                            <BookmarkSolidIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 text-red-600 hover:text-gray-900" />
                        ) : (
                            <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 mt-4 mr-4 hover:text-red-600" />
                        )}
                    </button>
                    <button onClick={add}>
                        {addBool ? (
                            <CheckIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 text-green-400 hover:text-red-600" />
                        ) : (
                            <PlusCircleIcon className="absolute bottom-0 right-0 h-5 w-5 mb-4 mr-4 hover:text-green-400" />
                        )}
                    </button>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-700 mb-1 mr-20">
                        Playlist Name
                    </h1>
                    <p className="text-gray-600 text-sm italic">Playlist Creator</p>
                </div>
            </div> */}
        </div>
    );
}

export default Playlists;
