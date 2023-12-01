import {Fragment} from "react";
import {Avatar, Button, Popover} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Logo = () => {
    return (
        <Fragment>
            <a href="/" style={{}}>
                <Avatar src={"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"}/> LOGO
            </a>
        </Fragment>
    )
}


const Nav = (params) => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")
        navigate("/login")
    }
    return (
        <Fragment>
            <div style={{
                display: "flex"
            }}>
                <div style={{
                    left: 0,
                }}>
                    <Logo/>
                </div>
                <div style={{
                    margin: "auto"
                }}>
                    XXX 系统
                </div>
                <div style={{
                    right: "80px",
                }}>
                    <Popover placement="bottom" content={
                        <Button onClick={logout}>登出</Button>
                    }>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Avatar icon={<UserOutlined/>}/>
                            <div style={{marginLeft: "8px"}}>{params.user.username}</div>
                        </div>
                    </Popover>

                </div>
            </div>
        </Fragment>
    )
}


export default Nav