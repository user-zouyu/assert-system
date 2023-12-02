import {Fragment} from "react";
import {Button, Form, Input} from "antd";
import {addAssert} from "../../requests/http.js";
import {error, log} from "../../utils/message.js";
import {useNavigate} from "react-router-dom";

const AddAssert = () => {
    const navigate = useNavigate();
    const onFinish = ({name, price, count}) => {
        addAssert(name, price, count)
            .then(res => {
                const {code, msg} = res
                if (code === 200) {
                    log(msg)
                    navigate("/home/assert_list")
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
        <Fragment>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>
                <div style={{
                    width: "300px",
                    height: "300px"
                }}>
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
                            label="资产名称"
                            name="name"
                            rules={[{required: true, message: '请输入资产名称!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="资产价格"
                            name="price"
                            rules={[{required: true, message: '请输入资产价格!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="资产数量"
                            name="count"
                            rules={[{required: true, message: '请输入资产数量!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                添加资产
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}

export default AddAssert