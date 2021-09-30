var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const app = express();


let generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


const scopes = [
  'user-read-private',
  'user-read-email'
],
client_secret = '2cc01b996a5a4a61bc635ffdacaaeb63',
redirectUri = 'http://localhost:8888/callback',
clientId = 'ada1fd60bef74c76b3e699ac0282da8d',
state = generateRandomString(16)

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: client_secret,
  redirectUri: redirectUri
})



app.get("/login", (req, res) => {
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)
  res.redirect(authorizeURL)
})


// Taken from https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});
  





const PORT = process.env.PORT || 8888;
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });