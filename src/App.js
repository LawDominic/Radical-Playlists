import {React, useEffect, useState} from 'react';
import Spotify from './components/Spotify';
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Playlists from "./components/Playlists"
import { Switch, Route } from 'react-router-dom';
import Upload from "./components/Upload";

const code = new URLSearchParams(window.location.search).get('code')


function App() {
 
  const [userID, setUserID] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [playlists, setPlaylists] = useState([])
  

  const loggedInStatus = (userID) => {
    if(userID) {
      setIsLoggedIn(true)
    }
  }


  useEffect(() => {
    loggedInStatus(userID)
  })

  console.log(`UserID: ${userID}`)
  console.log(`Are we logged in: ${isLoggedIn}`)
  console.log(`Access token is: ${accessToken}`)
  console.log(`Playlists are: ${playlists}`)

  return (
    <div class="min-h-screen h-full bg-gray-100 font-gotham">
      <NavBar userID={userID} isLoggedIn={isLoggedIn}/>
      <div>
        {code ? <Spotify code={code} setUserID={setUserID} setAccessToken={setAccessToken} setPlaylists={setPlaylists}/> : <> </>}
      </div>
      <Footer />
      <Switch>
        <Route path="/upload"><Upload userID={userID} isLoggedIn={isLoggedIn} playlists={playlists}/></Route>
        <Route path="/"><Playlists /></Route>
      </Switch>
    </div>
  );
}
export default App