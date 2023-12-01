import {createBrowserRouter, Navigate} from "react-router-dom";
import Home from "../pages/index.jsx";
import RouteContext from "./RouteContext.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        action: function () {
            console.log(arguments)
        },
        loader: function () {
            console.log(arguments)

        },
        children: [
            {
                path: "/page1",
                element: <div>Page 1</div>
            },
            {
                path: "/page2",
                element: () => {
                    // const route = useContext()
                    console.log("context", RouteContext)
                    return (
                        <div>Page 2</div>
                    )
                }
            },
            {
                path: "/*",
                element: <Navigate to="/"/>
            }
        ]
    }
])

export default routes