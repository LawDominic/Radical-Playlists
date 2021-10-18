import React, { useEffect, useRef, useState } from "react";
import pImg from "../images/pImg.png";

function User({userID}) {
    const ref = useRef();
    const [showUser, setShowUser] = useState(false);
    const spotifyURL = "https://open.spotify.com/user/" + userID
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
    return (
        <div className="flex my-auto justify-center">
            <div className="relative" ref={ref}>
                <button onClick={toggleUser} className="flex flex-row">
                <div className="block h-10 w-10 rounded-full overflow-hidden focus:outline-none">
                    <img
                    className="h-full w-full object-cover"
                    src={`${pImg}`}
                    alt="User Profile"
                    />
                </div>
                <p className="ml-4 my-auto text-white font-semibold hover:text-green-500">{userID}</p>
                </button>
                {showUser ? (
                <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                    <a
                    href={spotifyURL}
                    className="block px-4 py-2 text-gray-900 hover:text-green-500"
                    >
                    Spotify Profile
                    </a>
                    <div className="py-2">
                        <hr></hr>
                    </div>
                    <a
                    href="/"
                    className="block px-4 py-2 text-gray-900 hover:text-red-500"
                    >
                    Logout
                    </a>
                </div>
                ) : null}
            </div>
        </div>
    );
}

export default User;
