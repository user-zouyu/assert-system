import axios from "axios";
import {baseUrl} from "./urls.js";
import {message} from "antd";

const request = axios.create({
    baseURL: baseUrl
})

request.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("token")
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})


request.interceptors.response.use((response) => {
    if (response.status === 403) {
        window.location.href = "/login"
    }

    return response.data
}, (error) => {
    if (error.response?.status === 403) {
        window.location.href = "/login"
    }

    message.info(error.response?.data?.msg).then(() => {
    })

    return Promise.reject(error);
})

export default request;
