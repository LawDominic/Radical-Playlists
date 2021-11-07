import { React, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from 'react-router';

import Footer from "./components/Footer";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import Spotify from "./components/Spotify";

import Favourites from "./pages/Favourites";
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

  const history = useHistory();
  const addPlaylists = (content) => {
    playlistService.create(content, user); 
    setPlaylistCounter(playlistCounter+1);
    
    //add then here and update playlists to have removed ones
  };

  useEffect(() => {
    loggedInStatus(user); // Get logged in status once
  });

  useEffect(() => {
    playlistService.getAll()
      .then((response) => {
        setAllPlaylists(response);
        setPlaylistCounter(response.length);
        history.push('/')
      })
  }, [playlistCounter]);

  return (
    <div className="min-h-screen bg-gray-100 font-gotham">
      <NavBar user={user} isLoggedIn={isLoggedIn} accessToken={accessToken}/>
      
      <div>
        {code ? <Spotify code={code} setUser={setUser} setAccessToken={setAccessToken} setPlaylists={setUserPlaylists} allPlaylists={allPlaylists}/> : <> </>}
      </div>
      
      <Switch>
        <Route path="/favourites">
          <Favourites accessToken={accessToken} playlists={allPlaylists} user={user}/>
        </Route>

        <Route path="/upload">
          <Upload isLoggedIn={isLoggedIn} playlists={userPlaylists} updateFn={addPlaylists}/>
        </Route>
        
        <Route path="/">
          {isLoggedIn ? <Playlists accessToken={accessToken} playlists={allPlaylists} user={user}/> : <Landing />}
        </Route>
      </Switch>

      <div className="mt-10"> 
        <Footer /> 
      </div>
    </div>
  );
}
export default App;
