import request from "./request.js";
import {loginUrl, userInfoUrl} from "./urls.js";

const login = ({username, password}) => {
    return request.post(loginUrl, {
        username,
        password,
    })
}

const getUserInfo = () => {
    return request.get(userInfoUrl)
}


export {
    login,
    getUserInfo,
}