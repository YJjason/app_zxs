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
import axios from './../../../axios'
import Utils from './../../../utils/utils'
import moment from "../feedback";

class UserList extends Component {

    state = {
        list: []
    }
    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        const _this = this;
        axios.ajax({
            url: '/user/userlist',
            type: 'GET',
            dataType: 'JSON',
            data: {
                param: this.params.page
            }
        }).then((res) => {
            if (res.code == 0) {
                let list = res.data.item_list.map((item, index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    list: list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }

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
            type: 'PHONE',
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
    ];

    handleFilter(fieldsValue) {
        const _this = this;
        const uid = fieldsValue['UID'];
        const username = fieldsValue['username'];
        const tel = fieldsValue['tel'];
        const status = fieldsValue['status'];
        axios.ajax({
            url: '/user/userlist',
            data: {
                param: {
                    page: this.pages,
                    uid,
                    username,
                    tel,
                    status
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                let list = res.data.item_list.map((item, index) => {
                    item.key = index;
                    return item
                });
                this.setState({
                    list: list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    handleClickEdit(obj) {
        this.props.history.push("/user/list/" + obj.id)
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: 75,
                align: "center"
            }, {
                title: '用户名',
                dataIndex: 'user',
                width: 75,
                align: "center"
            }, {
                title: 'UID',
                dataIndex: 'uid',
                width: 75,
                align: "center"
            }, {
                title: '常住地',
                dataIndex: 'address',
                width: 75,
                align: "center"
            }, {
                title: '性别',
                dataIndex: 'gender',
                width: 75,
                align: "center",
                render: (record) => {
                    return record == 1 ? '男' : '女'
                }
            }, {
                title: '身份标签',
                dataIndex: 'itag',
                width: 75,
                align: "center",
                render: (record) => {
                    return record == 1 ? '用户' : record == 2 ? '官方用户' : record == 3 ? '公司员工' : ''
                }
            }, {
                title: '手机号',
                dataIndex: 'phone',
                width: 75,
                align: "center"
            }, {
                title: '文章数',
                dataIndex: 'articlesize',
                width: 75,
                align: "center"
            }, {
                title: '收藏数',
                dataIndex: 'collectsize',
                width: 75,
                align: "center"
            }, {
                title: '评论数',
                dataIndex: 'discusssize',
                width: 75,
                align: "center"
            }, {
                title: '状态',
                dataIndex: 'status',
                width: 75,
                align: "center",
                render: (record) => {
                    return record == 1 ? "启用" : "禁用"
                }
            }, {
                title: '注册时间',
                dataIndex: 'regtime',
                width: 100,
                align: "center"
            }, {
                title: '操作',
                dataIndex: 'operator',
                width: 75,
                align: "center",
                render: (record, obj) => {
                    return (
                        <div>
                            <a href="JavaScript:void (0)" onClick={() => this.handleClickEdit(obj)}>编辑</a> |
                            <a href="JavaScript:void (0)">停用</a>
                        </div>
                    )
                }
            }
        ]
        return (

            <div>
                <Card>
                    <Col span={18}>
                        <BaseForm formList={this.formList} filterSubmit={this.handleFilter.bind(this)}></BaseForm>
                    </Col>
                    <Col>
                        <Button type="primary">新建</Button>
                    </Col>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </Card>

            </div>
        );
    }

}

export default UserList;
