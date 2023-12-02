import request from "./request.js";
import {
    assertUrl,
    loginUrl,
    operateAllUrl,
    operateCancelUrl,
    operateConsentUrl,
    operateUrl,
    userInfoUrl
} from "./urls.js";
import {currentUser} from "../utils/user.js";

const login = ({username, password}) => {
    return request.post(loginUrl, {
        username,
        password,
    })
}

const getUserInfo = () => {
    return request.get(userInfoUrl)
}


const assertList = () => {
    return request.get(assertUrl)
}

const addAssert = (name, price, count) => {
    return request.post(assertUrl, {name, price, count})
}

const delAssert = (id) => {
    return request.delete(assertUrl, {
        params: {
            id
        }
    })
}


const registerOperate = (id, count) => {
    return request.post(operateUrl, {
        id,
        count,
    })
}

const getOperate = () => {
    const user = currentUser();
    if (user.type === "admin") {
        return request.get(operateAllUrl)
    }
    return request.get(operateUrl)
}

const cancelOperate = (id) => {
    return request.put(operateCancelUrl, {
        id
    })
}

const consentOperate = (id) => {
    return request.put(operateConsentUrl, {
        id
    })
}

const putOperate = (id) => {
    return request.put(operateUrl, {
        id
    })
}

export {
    login,
    getUserInfo,
    assertList,
    addAssert,
    delAssert,
    registerOperate,
    getOperate,
    cancelOperate,
    consentOperate,
    putOperate,
}