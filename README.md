<h1 align="center">
  <br>
  <img src="./public/logo.png" alt="Radical Playlists" width="200">
  <br>
  Radical Playlists
  <br>
</h1>

<h4 align="center">Upload and share playlists with Spotify users around the world.</h4>

## Table of Contents

* <a href="#outline-of-the-application">Outline of the application</a>
* <a href="#milestones-achieved">Milestones achieved</a>
* <a href="#source-code-guide">Source code guide</a>
* <a href="#next-steps">Next steps</a>
* <a href="#team-roles-and-contributions">Team roles and contributions</a>

## Outline of the application

The Radical Playlists web application is a hub for uploading, sharing, and saving playlists. It incorporates the Spotify API for both login services, and data retrieval, and profile integration.

## Milestones achieved

In this MVP, numerous goals have been achieved by Group U in the development of Radical Playlists.

<details>
<summary><strong>Week 9</strong></summary>

  - Backend
    - Implemented functionality with the Spotify API
    - Implemented Wrapper API for Spotify
    - Implemented Login Authentication with Spotify API

  - Frontend
    - Added Logo
    - Implemented Navigation Bar
    - Added Footer
    - Implemented Playlist Component
    - Implemented Upload Component
    - Added Page Routing
    - Implemented TailwindCSS
</details>

<details>
<summary> <strong>Week 10</strong> </summary>

  - Backend
    - Enabled pulling playlist data from profiles
    - Integrated MongoDB
    - Implemented primitve usage for Spotify playlists
    
  - Frontend
    - Implemented responsive design
    - Displayed username when logged in
    - Login button now removed when the user is logged in
    - Added QOL feature where clicking profile takes the user to their account
    - Refactored playlist display
    - Implemented UserPlaylists component
    - Implemented Upload page
    - Implemented User Component
    - QOL text formatting
</details>

<details>
<summary> <strong>Week 11</strong> </summary>

  - Backend
    - Finished MongoDB integration for playlists with three values in schema
      -  *playlistID*, *Upload Date*, and *Likes*
    - Allowed the application to dyamically pull playlist data from the Spotify servers using the playlistID
    - Allows users to send their playlist to the MongoDB

  - Frontend
    - Added the dropdown menu for sorting playlists
      - *Newest*, *Oldest*, *Ascending Likes*, *Descending Likes*, *Favourites*
    - Made the page responsive to different window sizes
</details>
    
<details>
<summary><strong>Week 12</strong></summary>

  - Backend
    - A user liking a playlist is now stored in MongoDB
    - Likes are pulled from MongoDB and are displayed
    - Added functionality for playlist filtering in the application
      - Playlists are sorted by *newest* on default
    - Changed user schema to include an array of favourited playlists
  - Frontend
    - Search bar component implemented
    - Fixed a minor visual bug where the footer appeared underneath the list of playlists
    - Updated logo and title
    - Removed placeholder playlist image, and instead use the actual playlist image
    - Fixed bug where website would crash if there was no songs in the playlist. 
    - Implemented landing page

</details>

## Source code guide

### Backend

#### Backend server
* <a href="/server/controllers/api.js">./server/controllers/api.js</a> 
  - This file contains HTTP routes and associated instructions if that route is chosen. These routes are handled using Express.js.
    - /playlists - Obtains the playlists from MongoDB and supplies a json response.
    - /login - Uses spotifyWebAPI wrapper to obtain an accessToken to be used within the application.
    - /upload - Allows to user to upload any playlist thats been selected on their personal account to send to the MongoDB.
    - /likes/:id - Allows a user to update the likes of a playlist.
* <a href="/server/models/playlists.js">./server/models/playlists.js</a> 
  - Allows the application to connect to the MongoDB database, and houses the schemas for both users, and playlists.
* <a href="/server/app.js">./server/app.js</a> 
  - A central file that implements api.js and allows for middleware.
* <a href="/server/server.js">./server/server.js</a> 
  - The main backend file that incorporate app.js and listens on a port.

### Frontend
* <a href="/src/App.js/">./src/App.js</a> 
  - The entrypoint to the application. It contains the actual display of pages, and the router to swap between them. It also contains a few global state variables, and gets the list of playlists to be passed down to the Playlists page

#### Frontend components
* <a href="/src/components/Footer.js">/src/components/Footer.js</a> 
  - Contains footer and navigation details
* <a href="/src/components/Landing.js">/src/components/Landing.js</a> 
  - Contains landing component and login button
* <a href="/src/components/NavBar.js">/src/components/NavBar.js</a> 
  - Contains navigation bar functionality
* <a href="/src/components/PlaylistCard.js">/src/components/PlaylistCard.js</a> 
  - Contains playlist functionality (like, dislike, favourite, save)
* <a href="/src/components/Spotify.js">/src/components/Spotify.js</a> 
  - On user login, sets the access token, and pulls their public playlists from the Spotify API 
* <a href="/src/components/User.js">/src/components/User.js</a> 
  - Contains user dropdown component
* <a href="/src/components/UserPlaylists.js">/src/components/UserPlaylists.js</a> 
  - Contains playlist upload and search

#### Frontend pages
* <a href="/src/pages/Playlists.js">/src/pages/Playlists.js</a> 
  - Home page of the application. It contains a list of uploaded playlists, and sorting functionality
* <a href="/src/pages/Upload.js">/src/pages/Upload.js</a>   
  - Gets a list of the logged in user's playlists, and displays them in a list with checkboxes. Selecting the checkboxes, and clicking the upload button save them to the mongoDB database, and display them on the homepage

#### Frontend services
* <a href="/src/services/navigate.js">./src/services/navigate.js</a> - 
* <a href="/src/services/spotifyService.js">./src/services/spotifyService.js</a> 
  - spotifyServices allows the frontend to connect to the backend as well as assisting in authentication.
    - spotifyServices supplies the loginURL for the Spotify API authentication. This URL contains the authentication endpoint, redirectUri, clientID, and information that Radical Playlists will be obtaining
  - getAll() - requests the /playlists route from the backend
  - create(newObject, user) - Passes a playlist to the /upload route in the backend if a user is logged in. If not, they are unauthorised
  - updateLikes(playlistID, newValue) - uses the /likes/:id route in the backend where id is the playlistID and newValue is the updated likes value for that playlist.
* <a href="/src/services/useAuth.js">./src/services/useAuth.js</a> 
  - Sets the user's access token upon a successful login attempt, otherwise redirects to the homepage

## Next steps

* Individual playlists - users won't have to be redirected to Spotify's playlist page, instead the playlist will display on the web application itself
* Song previews - users can play a 30 second preview of the selected song
* Personalised account - users can create a profile on the web application
* Extended search functionality - users can search more than they can currently which may include other users and uploaded playlists

## Team roles and contributions

Communication was managed through a private Discord group, utilising both the text chat and voice communication channels.

* Jacob Johnston - Backend Developer

* Neil Roberts - Backend Developer

* Dominic Law - Frontend Developer

* Ben Tullier - Frontend Developer

## Wireframes
<strong>Main Page</strong>
* <img src="/src/images/wireframe1.png" alt="Main page wireframe">

<strong>Upload Playlist Page</strong>
* <img src="/src/images/wireframe2.png" alt="Upload Playlist Wireframe">

<strong>Landing Page</strong>
* <img src="/src/images/wireframe3.png" alt="Landing Page wireframe"> 

## Mockups
<strong>Main Page</strong>
* <img src="/src/images/mockup1.png" alt="Main Page Mockup">

<strong>Upload Playlist Page</strong>
* <img src="/src/images/mockup2.png" alt="Upload Playlist Mockup">

<strong>Landing Page</strong>
* <img src="/src/images/mockup3.png" alt="Landing Page Mockup">