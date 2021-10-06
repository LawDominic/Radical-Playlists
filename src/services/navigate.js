import axios from 'axios'
const baseURL = "/api/"

const getLogin = () => {
    console.log("in server")
    return axios.get(baseURL + "login")
}

export default {getLogin}