import React, {useState} from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from "../images/logo.png";

function NavBar() {
    const mobileMenuHandler = (event) => {
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".mobile-menu");
    
        btn.addEventListener("click", () => {
          menu.classList.toggle("hidden");
        });
      }
    return (
        <div class="bg-black">
             <div className="flex justify-between font-gotham">
                <div className="flex space-x-20">
                <Link to="/" className="flex items-center py-4 px-2">
                    <img src={`${logo}`} className="h-10 w-10 mr-2" alt="logo" />
                    <span className="font-semibold text-white text-lg hover:text-green-500">Radical Playlists</span>
                </Link>
                <div className="hidden md:flex items-center space-x-4">
                    <NavLink exact to={'/'} className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Home</NavLink>
                    <br/>
                    <NavLink to="/upload" className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Upload playlists</NavLink>
                </div>
            </div>
                <NavLink to="/login" className="justify-end mr-20 py-4 px-2 text-white hover:text-green-500 transition duration-300">
                        <button class="bg-green-500 px-5 py-2 text-green-100 rounded-full hover:shadow-2xl hover:bg-green-600">
                            <p className="font-semibold">Login</p>
                        </button>
                    </NavLink>
                <div className="md:hidden flex items-center">
                <button onClick={mobileMenuHandler} className="outline-none mobile-menu-button">
                    <svg className="w-6 h-6 text-gray-500" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                </div>
            </div>
            <div className="hidden mobile-menu">
            <ul>
            <NavLink exact to={'/'} activeClassName="text-green-500" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-100 transition duration-300">Home</NavLink>
            <NavLink to="/upload" activeClassName="text-green-500" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-100 transition duration-300">Upload playlists</NavLink>
            </ul>
            </div>
            <Switch>
            <Route path="/upload"></Route>
            <Route path="/"></Route>
            </Switch>
        </div>
    )
}

export default NavBar;