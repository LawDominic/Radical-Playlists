//Based on https://dev.to/dipscoder/spotify-authentication-using-client-react-and-server-expressjs-27l0#4


require('dotenv').config()
const app = require('./app')
const port = 8888

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})