import { React, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Playlists from "./components/Playlists";
import Spotify from "./components/Spotify";
import Upload from "./components/Upload";

import playlistService from "./services/spotifyService";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  
  const [userID, setUserID] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState([]);

  const [playlistCounter, setPlaylistCounter] = useState(0);
  
  const loggedInStatus = (userID) => {
    if (userID) {
      setIsLoggedIn(true);
    }
  };

  const addPlaylists = (content) => {
    playlistService.create(content, userID); 
    setPlaylistCounter(playlistCounter+1);
    //add then here and update playlists to have removed ones
  };

  useEffect(() => {
    loggedInStatus(userID); // Get logged in status once
    console.log("Are we logged in? :", isLoggedIn);
  });

  useEffect(() => {
    playlistService.getAll()
      .then((response) => {
        console.log("Playlists we have obtained from MongoDB are : ", response);
        setAllPlaylists(response);
        setPlaylistCounter(response.length);
      })
  }, [playlistCounter]);

  // console.log(`UserID: ${userID}`)
  // console.log(`Are we logged in: ${isLoggedIn}`)
  // console.log(`Access token is: ${accessToken}`)
  // console.log(`Playlists are: ${userPlaylists}`)

  return (
    <div className="min-h-screen h-full bg-gray-100 font-gotham">
      <NavBar userID={userID} isLoggedIn={isLoggedIn} />
      <div>
        {code ? (<Spotify code={code} setUserID={setUserID} setAccessToken={setAccessToken} setPlaylists={setUserPlaylists}/>) : (<> </>)}
      </div>
      <Footer />
      <Switch>
        <Route path="/upload">
          <Upload userID={userID} isLoggedIn={isLoggedIn} playlists={userPlaylists} updateFn={addPlaylists}/>
        </Route>
        <Route path="/">
          {isLoggedIn && (<Playlists code={code} accessToken={accessToken} playlists={allPlaylists}/>)}
        </Route>
      </Switch>
    </div>
  );
}
export default App;
