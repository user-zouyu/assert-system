import {Fragment, useContext, useEffect, useState} from "react";
import {Menu} from "antd";
import {CarOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import UserContext from "../../routes/UserContext.jsx";


const userMenus = [
    {
        key: "/home/page1",
        icon: <CarOutlined/>,
        label: "Page 1",
    },
    {
        key: "/home/page2",
        icon: <CarOutlined/>,
        label: "Page 2",
    },
]

const adminMenus = [
    {
        key: "/home/page1",
        icon: <CarOutlined/>,
        label: "Admin Page 1",
    },
    {
        key: "/home/page2",
        icon: <CarOutlined/>,
        label: "Page 2",
    },
    {
        key: "/home/page3",
        icon: <CarOutlined/>,
        label: "Page 3",
    },
]

const Menus = (params) => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([])
    useEffect(() => {
        if (params.user.type === "admin") {
            setMenus([...adminMenus])
        } else if (params.user.type === "user") {
            setMenus([...userMenus])
        }
    }, [params.user.type])
    const clickHandler = ({key}) => {
        navigate(key)
    }
    return (
        <Fragment>
            <div>
                <Menu
                    items={menus}
                    onClick={clickHandler}
                />
            </div>
        </Fragment>
    )
}

export default Menus