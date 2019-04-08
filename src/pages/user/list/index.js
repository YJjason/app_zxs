/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Col, Card, Button, Table} from "antd";
import BaseForm from './../../../components/BaseForm';

class UserList extends Component {

    formList = [
        {
            type: 'INPUT',
            label: 'UID',
            placeholder: '',
            width: 75,
            filter: 'UID',
        },
        {
            type: 'INPUT',
            label: '用户名',
            placeholder: '',
            width: 75,
            filter: 'username',
        },
        {
            type: 'INPUT',
            label: '手机号',
            placeholder: '',
            width: 75,
            filter: 'tel',
        },
        {
            type: 'SELECT',
            label: '状态',
            placeholder: '',
            width: 100,
            list: [
                {
                    id: 0,
                    name: '全部状态'
                }, {
                    id: 1,
                    name: '正常'
                }, {
                    id: 2,
                    name: '停用'
                }
            ],
            filter: 'status',
        },
    ]

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: 75,
                align: "center"
            }, {
                title: '用户名',
                dataIndex: 'user_name',
                width: 75,
                align: "center"
            }, {
                title: 'UID',
                dataIndex: 'user_id',
                width: 75,
                align: "center"
            }, {
                title: '常住地',
                dataIndex: 'address',
                width: 75,
                align: "center"
            }, {
                title: '性别',
                dataIndex: 'sex',
                width: 75,
                align: "center"
            }, {
                title: '身份标签',
                dataIndex: 'label',
                width: 75,
                align: "center"
            }, {
                title: '手机号',
                dataIndex: 'tel',
                width: 75,
                align: "center"
            },{
                title: '文章数',
                dataIndex: 'article',
                width: 75,
                align: "center"
            },{
                title: '收藏数',
                dataIndex: 'collect',
                width: 75,
                align: "center"
            }, {
                title: '评论数',
                dataIndex: 'comment',
                width: 75,
                align: "center"
            },{
                title: '状态',
                dataIndex: 'status',
                width: 75,
                align: "center"
            }, {
                title: '注册时间',
                dataIndex: 'time',
                width: 100,
                align: "center"
            }, {
                title: '操作',
                dataIndex: 'operator',
                width: 75,
                align: "center",
                render: (record, obj) => {
                    return (
                        <a href="JavaScript:void (0)">编辑</a> |
                        <a href="JavaScript:void (0)">停用</a>
                    )
                }
            }
        ]
        return (
            <div>
                <Card>
                    <Col span={18}>
                        <BaseForm formList={this.formList}></BaseForm>
                    </Col>
                    <Col>
                        <Button type="primary">新建</Button>
                    </Col>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={columns}
                    />
                </Card>

            </div>
        );
    }

}

export default UserList;
