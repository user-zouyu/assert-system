import {getUserInfo} from "../requests/http.js";
import {json, redirect} from "react-router-dom";

const loader = async () => {
    const {code, data} = await getUserInfo()
    if (code === 200) {
        return json(data)
    }
    redirect("/login")
}

export default loader