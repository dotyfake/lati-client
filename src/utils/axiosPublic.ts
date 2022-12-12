import axios from "axios";
// https://lati-server.onrender.com/api/
const axiosPublic = axios.create({
    baseURL: 'https://lati-server.onrender.com/api/'
})

export default axiosPublic