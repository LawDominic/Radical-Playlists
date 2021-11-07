import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ShieldExclamationIcon } from "@heroicons/react/outline";

import User from "./User"

import pImg from "../images/defaultprofile.png";
import logo from "../images/logo.png";

import spotifyService from "../services/spotifyService";
import { loginUrl } from '../services/spotifyService'

function NavBar({user, isLoggedIn, accessToken}) {
  const spotifyURL = "https://open.spotify.com/user/"
  const [showUser, setShowUser] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)

  const deleteAccount = (e) => {
    spotifyService.deleteUser(user.id);
    window.location.reload()
}

  const mobileMenuHandler = (e) => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  };

  return (
    <div>
      <div className="bg-black">
        <div className="container mx-auto md:px-10 lg:px-0">
          <div className="flex">

            <div className="flex space-x-0 lg:space-x-20 w-full">
              
              <Link to="/" className="flex items-center py-4 px-2">
                <img src={`${logo}`} className="h-10 w-10 mr-2" alt="logo" />
                <span className="hidden font-semibold text-white text-lg lg:flex">
                  Radical Playlists
                </span>
              </Link>
              
              {isLoggedIn ?
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 rounded-full overflow-hidden focus:outline-none my-auto md:hidden">
                      <img
                      className="h-full w-full object-cover"
                      src={user.images[0] ? user.images[0].url : pImg }
                      alt="User Profile"
                      />
                </div>
                <p className="ml-4 my-auto text-white font-semibold hover:text-green-500 md:hidden">{user.id}</p>
              </div>
              : null }

              <div className="hidden md:flex md:items-center space-x-8">
                <NavLink exact to={"/"} className="text-white font-semibold hover:text-green-500 transition duration-300">
                  Home
                </NavLink>
                <br />
                <NavLink to="/upload" className="text-white font-semibold hover:text-green-500 transition duration-300">
                  Upload playlists
                </NavLink>
              </div>

            </div>

            <div className="invisible md:visible my-auto z-10">
              {isLoggedIn ?
                <User user={user} accessToken={accessToken}/> :
                <a href={loginUrl} className="justify-end text-white hover:text-green-500 transition duration-300">
                  <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:shadow-2xl hover:bg-green-600">
                    <p className="font-semibold">Login</p>
                  </button>
                </a>
              }
            </div>

            <div className="md:hidden flex items-center mr-4">
              <button onClick={mobileMenuHandler} className="outline-none mobile-menu-button">
                <svg
                  className="w-6 h-6 text-white"
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

          </div>

          <div className="hidden mobile-menu text-center">
            <ul>
              <NavLink exact to={"/"} className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500  transition duration-300">
                Home
              </NavLink>
              <NavLink to="/upload" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500 transition duration-300">
                Upload playlists
              </NavLink>
              {isLoggedIn ?
              <div>
                <a target="_blank" rel="noreferrer" href={spotifyURL + user.id} className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500 transition duration-300">
                  Spotify Profile
                </a>
                <a to="/" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-red-500 transition duration-300">
                  Logout
                </a>
                <p href="/" className="block text-sm px-4 py-2 text-white font-semibold hover:text-red-500" onClick={() =>{setDeleteModal(!deleteModal)}}>
                    Delete Data
                </p>
              </div>
                :
                <a href={loginUrl} className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500 transition duration-300">
                  Login
                </a>
              }
            </ul>
          </div>
          {deleteModal ? 
            <div class="flex flex-col space-y- min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-90 px-2">
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
      </div>
    </div>
  );
}

export default NavBar;
