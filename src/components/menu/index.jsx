import {Fragment} from "react";
import {Menu} from "antd";
import {CarOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


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
]

const Menus = () => {
    const navigate = useNavigate();
    const clickHandler = ({key}) => {
        navigate(key)
    }
    const menus = userMenus
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