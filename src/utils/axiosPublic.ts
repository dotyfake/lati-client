import axios from "axios";
// https://lati-server.onrender.com/api/
const axiosPublic = axios.create({
    baseURL: `${process.env.PUBLIC_URL_HTTPS}/api`
})

export default axiosPublic