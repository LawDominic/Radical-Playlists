import React from 'react';
import NavBar from "./components/NavBar"
import Playlists from "./components/Playlists"

function App() {
  return (
    <div class="bg-gray-50 font-gotham">
      <NavBar />
      <div class="container mx-auto">
        <Playlists />
      </div>
    </div>
  );
}

export default App;