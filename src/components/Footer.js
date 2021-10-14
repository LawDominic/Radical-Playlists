import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

function Footer() {
    return (
        <div className="bg-black fixed bottom-0 w-full text-white">
            <div className="flex flex-col items-center justify-between mx-auto py-2 md:flex-row container md:px-10 lg:px-0">
                <div>&copy; 2021 Radical Playlists.</div>
                <div className="flex mt-4 md:m-0">
                <NavLink exact to={"/"} className="px-4 text-sm hover:text-green-500">
                    Home
                </NavLink>
                <NavLink to="/upload" className="px-4 text-sm hover:text-green-500">
                    Upload playlists
                </NavLink>
                </div>
            </div>
            <Switch>
                <Route path="/upload"></Route>
                <Route path="/"></Route>
            </Switch>
        </div>
    );
}

export default Footer;
