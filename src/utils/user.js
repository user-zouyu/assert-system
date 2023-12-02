const currentUser = () => {
    return JSON.parse(window.localStorage.getItem("user") || "{}")
}


export {
    currentUser
}