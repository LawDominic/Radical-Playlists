import React from 'react';
import Dashboard from './components/Dashboard';
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Playlists from "./components/Playlists"
import { Switch, Route } from 'react-router-dom';
import Upload from "./components/Upload";


const code = new URLSearchParams(window.location.search).get('code')


function App() {
  return (
    <div class="min-h-screen h-full bg-gray-100 font-gotham">
      <NavBar />
      
      <div>
        {code ? <Dashboard code={code} /> : <> </>}
      </div>
      <Footer />


      

      <Switch>
        <Route path="/upload"><Upload /></Route>
        <Route path="/"><Playlists /></Route>
      </Switch>
    </div>
  );
}
export default App