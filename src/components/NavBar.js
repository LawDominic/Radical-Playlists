import React, { useState } from "react";
import { Link, NavLink} from "react-router-dom";
import User from "./User"

import logo from "../images/logo.png";
import {loginUrl} from '../services/spotifyService'

function NavBar() {
  const mobileMenuHandler = (event) => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <div className="bg-black">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="flex space-x-20">
              <Link to="/" className="flex items-center py-4 px-2">
                <img src={`${logo}`} className="h-10 w-10 mr-2" alt="logo" />
                <span className="font-semibold text-white text-lg">
                  Radical Playlists
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <NavLink
                  exact
                  to={"/"}
                  className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
                >
                  Home
                </NavLink>
                <br />
                <NavLink
                  to="/upload"
                  className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
                >
                  Upload playlists
                </NavLink>
              </div>
            </div>
            {/* {isLoggedIn ?
                <User /> :
                <a
                  href={loginUrl}
                  className="justify-end my-auto text-white hover:text-green-500 transition duration-300"
                >
                  <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:shadow-2xl hover:bg-green-600">
                    <p className="font-semibold">Login</p>
                  </button>
                </a>
            } */}
            <a
              href={loginUrl}
              className="justify-end my-auto text-white hover:text-green-500 transition duration-300"
            >
              <button className="bg-green-500 px-5 py-2 text-white rounded-full hover:shadow-2xl hover:bg-green-600">
                <p className="font-semibold">Login</p>
              </button>
            </a>
            <User />
            <div className="md:hidden flex items-center mr-4">
              <button
                onClick={mobileMenuHandler}
                className="outline-none mobile-menu-button"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
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
              <NavLink
                exact
                to={"/"}
                className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500  transition duration-300"
              >
                Home
              </NavLink>
              <NavLink
                to="/upload"
                className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500 transition duration-300"
              >
                Upload playlists
              </NavLink>
              <a
                to="/"
                className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-green-500 transition duration-300"
              >
                Spotify Profile
              </a>
              <NavLink
                to="/logout"
                className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-900 hover:text-red-500 transition duration-300"
              >
                Logout
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default NavBar;
