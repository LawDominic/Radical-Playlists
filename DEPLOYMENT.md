# Deployment

## Deployment URL
https://radical-playlists.netlify.app/

## Instructions to run and build the project
The project requires NodeJS and a MongoDB cluster to work.

1. Clone the repository
`$ git clone https://github.com/MQCOMP3120-2021/group-web-project-group-u`

2. Go into the directory
`$ cd group-web-project-group-u`

3. Install dependencies
`$ npm install`

4. Create a .env file in the root directory of the project and include your MongoDB cluster URL
`DB_HOST=mongodb+srv://<user>:<password>@cluster0.6smst.mongodb.net/<db>?retryWrites=true&w=majority`

5. Start the React server
`$ npm start`

6. Start the backend server
`$ npm run server`

## Continuous Integration

Continuous Integration has not been used in this project.