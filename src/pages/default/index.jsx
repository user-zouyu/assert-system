import {Fragment} from 'react';
import {currentUser} from "../../utils/user.js";


const Default = () => {
    const user = currentUser();
    return (
        <Fragment>
            <div style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{fontSize: "40px"}}>欢迎 {user.username}</div>
            </div>
        </Fragment>
    )
}

export default Default;