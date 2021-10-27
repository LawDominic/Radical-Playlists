import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "./useAuth";

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "ada1fd60bef74c76b3e699ac0282da8d";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}`;

const getAll = () => {
  return axios.get("http://localhost:8888/playlists")
                .then(response => response.data)
}


const create = (newObject, user) => {
  console.log("Current user is: " + user)
  // User is not logged in - Need to improve error handling
  if (!user) {
      return new Promise((res) => res(null))
  }
  return axios.post("http://localhost:8888/upload", newObject)
                .then(response => response.data)
}

const updateLikes = (playlistID, newValue) => {
    return axios.put("http://localhost:8888/likes/" + playlistID, {playlistID, newValue})
            .then(response => response.data)
}

const checkForUser =  (userID) => {
   return axios.get("http://localhost:8888/users/" + userID )
            .then(response => response.data)
}

const createUser = (userID) => {
  return axios.post("http://localhost:8888/users", {userID})
          .then(response => response.data)
}

export default {create, getAll, updateLikes, checkForUser, createUser}