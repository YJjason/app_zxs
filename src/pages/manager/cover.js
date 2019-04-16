/**
 * +----------------------------------------------------------------------
 * | cover
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react'
import {Card, Col, Form, Table, Button} from "antd";
import BaseForm from "./../../components/BaseForm";
import axios from './../../axios';
import Utils from './../../utils/utils'

class Cover extends Component {

    state = {
        list: []
    }
    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        const _this = this
        axios.ajax({
            url: '/cover/list',
            data: {
                page: this.params.page
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
                        _this.requestList();
                    })
                })
            }
        })
    }

    formList = [
        {
            type: 'SELECT',
            label: '位置',
            placeholder: '',
            width: 100,
            list: [
                {
                    id: 0,
                    name: '全部位置'
                }, {
                    id: 1,
                    name: '品牌榜单'
                }, {
                    id: 2,
                    name: '分类榜单'
                }, {
                    id: 3,
                    name: '美家案例'
                }, {
                    id: 4,
                    name: '装修心得'
                }, {
                    id: 5,
                    name: '话题讨论'
                }, {
                    id: 6,
                    name: 'PK广场'
                }
            ],
            filter: 'status',
        }
    ];

    handleFilter() {
    }

    render() {
        const columns = [
            {
                title: '封面ID',
                dataIndex: 'id',
                width: 75,
                align: "center"
            }, {
                title: '位置',
                dataIndex: 'position',
                width: 75,
                align: "center"
            }, {
                title: '封面图',
                dataIndex: 'img_url',
                width: 100,
                align: "center",
                render:(record,obj)=>{
                    return(
                        <img src={obj.img_url} alt=""/>
                    )
                }
            }, {
                title: '标题',
                dataIndex: 'title',
                width: 75,
                align: "center"
            }, {
                title: '描述',
                dataIndex: 'description',
                width: 75,
                align: "center",
            }, {
                title: '操作',
                dataIndex: 'operator',
                width: 75,
                align: "center",
                render: (record, obj) => {
                    return (
                        <div>
                            <a href="JavaScript:void (0)" onClick={() => this.handleClickEdit(obj)}>编辑</a> |
                            <a href="JavaScript:void (0)"
                               onClick={() => this.handleClickUse(obj)}>{obj.status == 0 ? '禁用' : '启用'}</a>
                        </div>
                    )
                }
            }
        ]
        return (
            <div>
                <Card title="封面管理">
                    <Col span={18}> <BaseForm formList={this.formList}
                                              filterSubmit={this.handleFilter.bind(this)}></BaseForm></Col>
                    <Col><Button type="primary">新建</Button></Col>
                </Card>
                <Card style={{marginTop: 10}}>
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

export default Cover
