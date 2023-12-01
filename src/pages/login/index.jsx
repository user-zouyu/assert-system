import {useNavigate} from "react-router-dom";
import {login} from "../../requests/http.js";
import {error, log} from "../../utils/message.js";
import {Button, Card, Form, Input} from "antd";
import {useContext} from "react";
import UserContext from "../../routes/UserContext.jsx";

const Login = () => {
    const navigate = useNavigate()
    const userContext = useContext(UserContext)

    const onFinish = (values) => {
        const {username, password} = values
        login({username, password})
            .then(res => {
                const {code, data, msg} = res
                if (code === 200) {
                    const {token, user} = data
                    log(msg)
                    window.localStorage.setItem("token", token)
                    window.localStorage.setItem("user", JSON.stringify(user))
                    userContext.setUser(user)
                    navigate("/home")
                } else {
                    error(msg)
                }
            })
            .catch(() => {
                error()
            })

    };

    const onFinishFailed = () => {
    };

    return (
        <div>
            <Card
                title="登录"
                bordered={true}
                style={{
                    width: 300,
                    margin: "auto",
                    top: 120,
                    backgroundColor: "#fafafa",
                    borderBlockColor: "#f0f0f0",
                    borderRadius: 10
                }}
            >
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}


export default Login;