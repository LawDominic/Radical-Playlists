import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "ada1fd60bef74c76b3e699ac0282da8d";

const scopes = ["streaming","user-read-email","user-read-private",];
export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;

// Get all playlists that are stored in the database
const getAll = () => {
  return axios.get("http://localhost:8888/playlists")
                .then(response => response.data)
}

// Create allows a user to upload a playlist to the database
const create = (newObject, user) => {

  // User is not logged in - Need to improve error handling
  if (!user) {
      return new Promise((res) => res(null))
  }

  return axios.post("http://localhost:8888/upload", {newObject, user})
                .then(response => response.data)
}

// Updates the likes value for a particular playlist
const updateLikes = (playlistID, newValue) => {
    return axios.put("http://localhost:8888/likes/" + playlistID, {playlistID, newValue})
            .then(response => response.data)
}

// Is used in Spotify.js to check if a user is currently in the database. If not, add them
const checkForUser =  (userID) => {
   return axios.get("http://localhost:8888/users/" + userID )
            .then(response => response.data)
}


// Creates a user into the database
const createUser = (userID) => {
  return axios.post("http://localhost:8888/users", {userID})
          .then(response => response.data)
}

// Deletes a user and all associated data off the database
const deleteUser = (userID) => {
  return axios.delete("http://localhost:8888/users/" + userID)
          .then(response => response.data);
}

export default {create, deleteUser, getAll, updateLikes, checkForUser, createUser}