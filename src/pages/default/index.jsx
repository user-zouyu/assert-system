import {Fragment} from 'react';
import {useLoaderData} from "react-router-dom";

const Default = () => {
    const loaderData = useLoaderData()
    console.log("loaderData", loaderData)
    return (
        <Fragment>
            <div>欢迎使用 {loaderData}</div>
        </Fragment>
    )
}

export default Default;