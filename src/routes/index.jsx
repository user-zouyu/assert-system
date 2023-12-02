import {createBrowserRouter, Navigate} from "react-router-dom";
import Home from "../pages/index.jsx";
import loader from "./loader.js";
import Default from "../pages/default/index.jsx";
import Login from "../pages/login/index.jsx";

const adminRoutes = createBrowserRouter([
    {
        path: "/home",
        element: <Home/>,
        loader: loader,
        children: [
            {
                index: true,
                element: <Default/>
            },
            {
                path: "/home/page1",
                element: <div>adminRoutes 1</div>
            },
            {
                path: "/home/page2",
                element: <div>adminRoutes 2</div>
            },
            {
                path: "/home/*",
                element: <Navigate to="/home"/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/*",
        element: <Navigate to={"/home"}/>
    }
])


const userRoutes = createBrowserRouter([
    {
        path: "/home",
        element: <Home/>,
        loader: loader,
        children: [
            {
                index: true,
                element: <Default/>
            },
            {
                path: "/home/page1",
                element: <div>userRoutes</div>
            },
            {
                path: "/home/page2",
                element: <div>userRoutes</div>
            },
            {
                path: "/home/*",
                element: <Navigate to="/home"/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/*",
        element: <Navigate to={"/home"}/>
    }
])

export {
    adminRoutes,
    userRoutes,
}