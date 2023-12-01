import axios from "axios";
import {baseUrl} from "./urls.js";

const request = axios.create({
    baseURL: baseUrl
})

request.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("token")
    console.log("token", token)
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})


request.interceptors.response.use((response) => {
    console.log("response")
    if (response.status === 403) {
        console.log("403")
        window.location.href = "/login"
    }

    return response.data
}, (error) => {
    if (error.response.status === 403) {
        console.log("e403")
        window.location.href = "/login"
    }
    return Promise.reject(error);
})

export default request;