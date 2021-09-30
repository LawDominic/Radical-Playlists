import React from 'react';
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Playlists from "./components/Playlists"

function App() {
  return (
    <div class="min-h-screen h-full bg-gray-100 font-gotham">
      <NavBar />
      <div class="container mx-auto">
        <Playlists />
      </div>
      <Footer />
    </div>
  );
}

export default App;