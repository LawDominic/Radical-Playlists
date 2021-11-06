import { React, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import Spotify from "./components/Spotify";

import Playlists from "./pages/Playlists";
import Upload from "./pages/Upload";

import playlistService from "./services/spotifyService";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState([]);

  const [playlistCounter, setPlaylistCounter] = useState(0);
  
  const loggedInStatus = (user) => {
    if (user) {
      setIsLoggedIn(true);
    }
  };

  const addPlaylists = (content) => {
    playlistService.create(content, user); 
    setPlaylistCounter(playlistCounter+1);
    //add then here and update playlists to have removed ones
  };

  useEffect(() => {
    loggedInStatus(user); // Get logged in status once
    // console.log("user", user);
  });

  useEffect(() => {
    playlistService.getAll()
      .then((response) => {
        // console.log("Playlists we have obtained from MongoDB are : ", response);
        setAllPlaylists(response);
        setPlaylistCounter(response.length);
      })
  }, [playlistCounter]);

  return (
    <div className="min-h-screen bg-gray-100 font-gotham">
      <NavBar user={user} isLoggedIn={isLoggedIn} />
      
      <div>
        {code ? <Spotify code={code} setUser={setUser} setAccessToken={setAccessToken} setPlaylists={setUserPlaylists} allPlaylists={allPlaylists}/> : <> </>}
      </div>
      
      <Switch>
        <Route path="/upload">
          <Upload isLoggedIn={isLoggedIn} playlists={userPlaylists} updateFn={addPlaylists}/>
        </Route>
        
        <Route path="/">
          {isLoggedIn ? <Playlists code={code} accessToken={accessToken} playlists={allPlaylists} user={user}/> : <Landing />}
        </Route>
      </Switch>

      <div className="mt-10"> 
        <Footer /> 
      </div>
    </div>
  );
}
export default App;
