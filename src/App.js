import React from 'react';
import Dashboard from './components/Dashboard';
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"

const code = new URLSearchParams(window.location.search).get('code')


function App() {
  return (
    <div class="min-h-screen h-full bg-gray-100 font-gotham">
      <NavBar />
      <div>
        {code ? <Dashboard code={code} /> : <> </>}
      </div>
      <Footer />
    </div>
  );
}

export default App;