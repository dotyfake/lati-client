import axios from "axios";
// https://lati-server.onrender.com/api/
const axiosPublic = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default axiosPublic