import {Fragment, useEffect, useState} from "react";
import {Menu} from "antd";
import {CarOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


const userMenus = [
    {
        key: "/home/assert_list",
        icon: <CarOutlined/>,
        label: "所有资产",
    },
    {
        key: "/home/operate",
        icon: <CarOutlined/>,
        label: "资产借用记录",
    }
]

const adminMenus = [
    {
        key: "/home/assert_list",
        icon: <CarOutlined/>,
        label: "所有资产",
    },
    {
        key: "/home/assert_add",
        icon: <CarOutlined/>,
        label: "添加资产",
    },
    {
        key: "/home/operate",
        icon: <CarOutlined/>,
        label: "资产管理",
    },

]

const Menus = (params) => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([])
    useEffect(() => {
        if (params.user?.type) {
            if (params.user.type && params.user.type === "admin") {
                setMenus([...adminMenus])
            } else if (params.user.type && params.user.type === "user") {
                setMenus([...userMenus])
            }
        }
    }, [params])
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