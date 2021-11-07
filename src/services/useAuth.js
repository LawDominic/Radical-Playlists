// Based on https://dev.to/dipscoder/spotify-authentication-using-client-react-and-server-expressjs-27l0#4

import { useEffect, useState } from "react";

import axios from "axios";

export default function useAuth(code) {
  
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    axios.post("/login", { code })
      .then((response) => {
        
        // If success then cut the code string from the URL and execute the other thing
        window.history.pushState({}, null, "/");
        setAccessToken(response.data.accessToken);
      })
      .catch(() => {
        //   If fail redirect to home page - Login page
        window.location = "/";
      });
  }, [code]);

  return accessToken
}