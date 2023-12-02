import {Fragment, useState} from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Home from "../pages/index.jsx";
import RouteContext from "./RouteContext.jsx";
import UserContext from "./UserContext.jsx";
import Default from "../pages/default/index.jsx";
import Login from "../pages/login/index.jsx";
import loader from "./loader.js";
import AddAssert from "../pages/AddAssert/index.jsx";
import AssertList from "../pages/AssertList/index.jsx";
import Operate from "../pages/Operate/index.jsx";


const defaultRoutes = () => {

    return createBrowserRouter([
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
                    path: "/home/assert_list",
                    element: <AssertList/>
                },
                {
                    path: "/home/assert_add",
                    element: <AddAssert/>,
                },
                {
                    path: "/home/operate",
                    element: <Operate/>,
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
        }])
}

const Route = () => {
    const [route, setRoute] = useState(defaultRoutes())
    const [user, setUser] = useState({})

    return (
        <Fragment>
            <RouteContext.Provider value={{route, setRoute}}>
                <UserContext.Provider value={{user, setUser}}>
                    <RouterProvider router={route}/>
                </UserContext.Provider>
            </RouteContext.Provider>
        </Fragment>
    )
}


// const Page2 = () => {
//     const route = useContext(RouteContext)
//     console.log("context", route)
//     const update = () => {
//         route.setRoute(createBrowserRouter([
//             {
//                 path: "/",
//                 element: <Home/>,
//                 children: [
//                     {
//                         path: "/page1",
//                         element: <div>new Page 1</div>
//                     },
//                     {
//                         path: "/page2",
//                         element: <Page2/>
//                     },
//                     {
//                         path: "/*",
//                         element: <Navigate to="/"/>
//                     }
//                 ]
//             }
//         ]))
//     }
//     return (
//         <div><Button onClick={update}>Burron</Button>Page 2</div>
//     )
// }
export default Route