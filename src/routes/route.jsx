import {Fragment, useState} from "react";
import {createBrowserRouter, json, Navigate, redirect, RouterProvider} from "react-router-dom";
import Home from "../pages/index.jsx";
import RouteContext from "./RouteContext.jsx";
import UserContext from "./UserContext.jsx";
import Default from "../pages/default/index.jsx";
import {getUserInfo} from "../requests/http.js";
import Login from "../pages/login/index.jsx";


const loader = async ({request}) => {
    console.log("request", request)
    const {code, data} = await getUserInfo()
    if (code === 200) {
        console.log("data", data)
        return json(data)
    }
    redirect("/login")
}

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
                    path: "/home/page1",
                    element: <div>Page 1</div>
                },
                {
                    path: "/home/page2",
                    element: <div>Page 2</div>
                },
                {
                    path: "/home/page3",
                    element: <Page3/>
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

const Page3 = () => {
    return (
        <Fragment>
            <div>Page 3 <div>Page OK</div></div>
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