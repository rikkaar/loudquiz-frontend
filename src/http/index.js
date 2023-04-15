import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

export default $api