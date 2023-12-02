import {Fragment} from "react";
import {Layout} from "antd";
import {Content, Header} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import {Outlet, useLoaderData} from "react-router-dom";
import Menus from "../components/menu/index.jsx";
import Nav from "../components/nav/index.jsx";

const Home = () => {
    const loaderData = useLoaderData();

    return (
        <Fragment>
            <Layout>
                <Header
                    style={{
                        height: "64px",
                        borderBottom: "1px #FCFCFC",
                        backgroundColor: "#FFFFFF"
                    }}>
                    <Nav user={loaderData}/>
                </Header>
                <Layout hasSider>
                    <Sider
                        width="150px"
                        style={{
                            minHeight: "calc(100vh - 64px)"
                        }}>
                        <Menus user={loaderData}/>
                    </Sider>
                    <Content
                        style={{
                            width: "calc(100vw - 150px)",
                            padding: "10px 15px"
                        }}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    )
}

export default Home