import axios from "axios";

const axiosPublic = axios.create({
    baseURL: `https://lati.dotydoty.dev/api/`
})

export default axiosPublic