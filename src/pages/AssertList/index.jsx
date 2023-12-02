import {createContext, Fragment, useContext, useMemo, useState} from 'react';
import {Button, Form, Input, Modal, Table} from "antd";
import {assertList, delAssert, registerOperate} from "../../requests/http.js";
import {error, log} from "../../utils/message.js";
import {currentUser} from "../../utils/user.js";


const AssertContext = createContext({})

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '资产名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '单个价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '总数',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: '跟新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
]

const adminOP = {
    key: "id",
    title: '操作',
    render: (_, {id}) => {
        return (
            <div key={id}>
                <DeleteButton id={id}/>
            </div>
        )
    }
}


const DeleteButton = (params) => {
    const assertContext = useContext(AssertContext);
    const del = () => {
        delAssert(params.id).then(({code, msg}) => {
            if (code === 200) {
                log(msg)
                assertList().then((res) => {
                    const {code, data, msg} = res
                    if (code === 200) {
                        assertContext.setDataSource(data)
                    } else {
                        error(msg)
                    }
                })
            } else {
                error(msg)
            }
        })
    }
    return (
        <Button onClick={del} danger>报废资产</Button>
    )
}


const userOP = {
    key: "id",
    title: '操作',
    render: (_, {id}) => {
        return (
            <div key={id}>
                <RegisterButton id={id}/>
            </div>
        )
    }

}
const RegisterButton = (params) => {
    const {id} = params
    const [show, setShow] = useState(false);
    const assertContext = useContext(AssertContext);

    const onFinish = ({count}) => {

        registerOperate(id, count).then(({code, msg}) => {
            if (code === 200) {
                log(msg)
                assertList().then((res) => {
                    const {code, data, msg} = res
                    if (code === 200) {
                        assertContext.setDataSource(data)
                    } else {
                        error(msg)
                    }
                })
            }
        })
        setShow(false)
    }
    return (
        <div>
            <Button onClick={() => {
                setShow(true)
            }}>借用</Button>
            {show ? (
                <Modal
                    title="借用登记"
                    open={show}
                    footer=""
                    onCancel={() => {
                        setShow(false)
                    }}
                    onOk={() => {
                        setShow(false)
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={() => {
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="数量"
                            name="count"
                            rules={[{required: true, message: '请输入借用数量'}]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                借用
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            ) : ""}
        </div>
    )
}

const AssertList = () => {
    const [dataSource, setDataSource] = useState([]);
    const user = currentUser();
    let col = []
    if (user.type === "admin") {
        col = [...columns, adminOP]
    } else {
        col = [...columns, userOP]
    }

    useMemo(() => {
        assertList().then((res) => {
            const {code, data, msg} = res
            if (code === 200) {
                setDataSource(data)
            } else {
                error(msg)
            }
        })
    }, [])
    return (
        <Fragment>
            <AssertContext.Provider value={{dataSource, setDataSource}}>
                <Table
                    dataSource={dataSource}
                    columns={col}
                    rowKey={(record) => record.id}
                />
            </AssertContext.Provider>
        </Fragment>
    );
};

export default AssertList;