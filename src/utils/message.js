import {message} from "antd";

const error = (msg) => {
    message.error(msg || "未知错误").then(() => {
    })
}


const log = (msg) => {
    msg || message.info(msg).then(() => {
    })
}


export {
    error,
    log
}