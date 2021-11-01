import React, { useEffect, useRef, useState } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
import pImg from "../images/defaultprofile.png";
function User({user}) {
    const ref = useRef();
    const [showUser, setShowUser] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const spotifyURL = "https://open.spotify.com/user/" + user.id
    useEffect(() => {
        const ifOutside = (e) => {
        if (showUser && ref.current && !ref.current.contains(e.target)) {
            setShowUser(false);
        }
        };
        document.addEventListener("mousedown", ifOutside);
        return () => {
            document.removeEventListener("mousedown", ifOutside);
        };
    }, [showUser]);

    const toggleUser = (e) => {
        e.stopPropagation();
        setShowUser(!showUser);
    };

    const deleteAccount = (e) => {
        e.preventDefault();
    }

    return (
        <div>
        <div className="flex my-auto justify-center">
            <div className="relative" ref={ref}>
                <button onClick={toggleUser} className="flex flex-row">
                <div className="block h-10 w-10 rounded-full overflow-hidden focus:outline-none">
                    <img
                    className="h-full w-full object-cover"
                    src={user.images[0] ? user.images[0].url : pImg }
                    alt="User Profile"
                    />
                </div>
                <p className="ml-4 my-auto text-white font-semibold hover:text-green-500">{user.id}</p>
                </button>
                {showUser ? (
                <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                    <a
                    target="_blank"
                    rel="noreferrer"
                    href={spotifyURL}
                    className="block px-4 py-2 text-gray-900 hover:text-green-500"
                    >
                    Spotify Profile
                    </a>
                    <div className="py-2">
                        <hr/>
                    </div>
                    <a
                    href="/"
                    className="block px-4 py-2 text-gray-900 hover:text-red-500"
                    >
                    Logout
                    </a>
                    <div className="py-2">
                        <hr/>
                    </div>
                    <p
                    href="/"
                    className="block px-4 py-2 text-gray-900 hover:text-red-500 text-sm"
                    onClick={() => {setDeleteModal(!deleteModal); setShowUser(false)}}
                    >
                    Delete your data
                    </p>
                </div>
                ) : null}
            </div>
        </div>
        {deleteModal ? 
            <div class="flex flex-col space-y- min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-90">
                <div class="flex flex-col p-8 bg-white rounded-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <ShieldExclamationIcon className="h-12 w-12 text-red-600 rounded-xl bg-red-100 p-2"/>
                            <div class="flex flex-col ml-3">
                                <div class="font-medium leading-none">Confirmation</div>
                                <p class="text-sm text-gray-600 leading-none mt-1">By deleting your account you will lose all your data.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex mx-auto items-center justify-center space-x-2 mt-6">
                        <button onClick={() => {setDeleteModal(false)}} className="bg-gray-100 px-5 py-2 text-gray-900 rounded-full hover:bg-gray-200 shadow-md">
                            Cancel
                        </button>
                        <button onClick={deleteAccount} className="bg-red-500 px-5 py-2 text-white rounded-full hover:bg-red-600 shadow-md">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        : null}
        </div>
    );
}

export default User;
