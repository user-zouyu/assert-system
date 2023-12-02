import React, {createContext, Fragment, useContext, useMemo} from 'react';
import {Button, message, Table} from "antd";
import {currentUser} from "../../utils/user.js";
import {cancelOperate, consentOperate, getOperate, putOperate} from "../../requests/http.js";

const DataSourceContext = createContext({});


const operateColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '借用资产',
        render: (_, r) => r.assert.name,
    },
    {
        title: '借用人',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '借用状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '借用总数',
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

const userColumns = [
    {
        title: "操作",
        render: (_, record) => {
            return (
                <UserOpButton record={record}/>
            )
        }
    }
]


const UserOpButton = (params) => {
    const {record} = params
    const context = useContext(DataSourceContext);
    console.log(record)
    if (record && record.status === "借出审核中") {
        console.log("ok", record)
        return (
            <Fragment>
                <Button
                    onClick={() => {
                        cancelOperate(record.id).then(({code, msg}) => {
                            if (code === 200) {
                                context.flushed()
                                message.info(msg).then(() => {
                                })
                            }
                        })
                    }}
                >撤销</Button>
            </Fragment>
        )
    }

    if (record?.status === "资产使用中") {

        return (
            <Fragment>
                <Button
                    onClick={() => {
                        putOperate(record.id).then(({code, msg}) => {
                            if (code === 200) {
                                context.flushed()
                                message.info(msg).then(() => {
                                })
                            }
                        })
                    }}
                >归还</Button>
            </Fragment>
        )
    }

    return (
        <Fragment/>
    )
}


const adminColumns = [
    {
        title: "操作",
        render: (_, record) => {
            return (
                <AdminOpButton record={record}/>
            )
        }
    }
]

const AdminOpButton = (params) => {
    const context = useContext(DataSourceContext);
    const {record} = params

    if (record.status === "借出审核中") {
        return (
            <Fragment>
                <Button onClick={() => {
                    cancelOperate(record.id).then(({code, msg}) => {
                        if (code === 200) {
                            context.flushed()
                            message.info(msg).then(() => {
                            })
                        }
                    })
                }}>撤销</Button>
                <div style={{padding: "5px", display: "inline-block"}}></div>
                <Button onClick={() => {
                    consentOperate(record.id).then(({code, msg}) => {
                        if (code === 200) {
                            context.flushed()
                            message.info(msg).then(() => {
                            })
                        }
                    })
                }}>同意</Button>
            </Fragment>
        )
    }

    return (
        <Fragment>

        </Fragment>
    )
}


const Operate = () => {
    const [dataSource, setDataSource] = React.useState([])
    let columns = []
    const user = currentUser();
    if (user.type === "admin") {
        columns = [...operateColumns, ...adminColumns]
    } else if (user.type === "user") {
        columns = [...operateColumns, ...userColumns]
    } else {
        columns = [...operateColumns]
    }

    const flushed = () => {
        getOperate().then((res) => {
            const {code, data} = res
            if (code === 200) {
                setDataSource(data)
            }
        })
    }

    useMemo(() => {
        flushed()
    }, [])
    return (
        <Fragment>
            <DataSourceContext.Provider value={{dataSource, setDataSource, flushed}}>
                <Table
                    style={{maxWidth: "100%"}}
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={(record) => record.id}
                />
            </DataSourceContext.Provider>
        </Fragment>
    );
};

export default Operate;