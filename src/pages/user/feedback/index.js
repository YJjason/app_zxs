/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Table, Modal, Form, Radio, Input, List, Avatar} from "antd";
import BaseForm from './../../../components/BaseForm';
import axios from './../../../axios';
import Utils from './../../../utils/utils'
import moment from 'moment'


const FormItem = Form.Item;
const Item = List.Item

class FeedBack extends Component {

    state = {
        list: [],
        isDetailVisible: false,
        details: {
            id: '',
            imgs: '',
            content: '',
            tel: '',
            time: ''
        }
    }
    params = {
        page: 1,
    };

    componentWillMount() {
        this.requestList();
    }

    requestList = () => {
        const _this = this;
        axios.ajax({
            url: '/feedback/list',
            type: 'GET',
            dataType: 'JSON',
            data: {
                param:{
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                let list = res.data.item_list.map((item, index) => {
                    item.key = index;
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

    /*查询*/
    handleFilter(fieldsValue) {
        const _this = this;
        const begin_time = moment(fieldsValue['timeStart']).format('YYYY-MM-DD') || "";
        const end_time = moment(fieldsValue['timeEnd']).format('YYYY-MM-DD') || "";
        axios.ajax({
            url: '/feedback/list',
            data: {
                param: {
                    page: this.pages,
                    begin_time,
                    end_time
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

    formList = [
        {
            type: '时间查询',
            label: '请选择入职如期',
            placeholder: '请选择日期',
            width: 75,
            filter: 'begin_time',
        },
    ]

    /*产看详情*/
    handleClickDetail(obj) {
        this.setState({
            isDetailVisible: true
        })
        const _this = this;
        axios.ajax({
            url: '/feedback/info',
            type: 'GET',
            dataType: "JSON",
            data: {
                param: {
                    id: obj.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                let tempData = res.data.item_list;

            }
        })

    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: 75,
                align: "center"
            }, {
                title: 'UID',
                dataIndex: 'user_id',
                width: 75,
                align: "center"
            }, {
                title: '反馈内容',
                dataIndex: 'content',
                width: 150,
                align: "center"
            }, {
                title: '手机号',
                dataIndex: 'tel',
                width: 75,
                align: "center"
            }, {
                title: '反馈时间',
                dataIndex: 'time',
                width: 100,
                align: "center"
            }, {
                title: '操作',
                dataIndex: 'operator',
                width: 75,
                align: "center",
                render: (record, obj) => {
                    return <a href="JavaScript:void (0)" onClick={() => this.handleClickDetail(obj)}>查看详情</a>
                }
            }
        ]
        return (
            <div>
                <Card title="用户反馈" style={{marginBottom: 10}}>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter.bind(this)}></BaseForm>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        bordered
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </Card>
                <Modal
                    style={{width:800}}
                    title='反馈详情'
                    visible={this.state.isDetailVisible}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            isDetailVisible: false
                        })
                    }}
                >
                    <VersionForm detailData={this.state.details}/>
                </Modal>
            </div>
        );
    }

}

export default FeedBack;

class VersionForm extends Component {
    render() {
        let data = [{
            id: '11',
            content: "af",
            imgs: ["http://dummyimage.com/100x100",
                "http://dummyimage.com/100x100",
                "http://dummyimage.com/100x100"],
            tel: '15151',
            time: '2019-04-08'
        }];
        // data = this.props.detailData;
        return (
            <div>
                <List
                    dataSource={data}
                    split={false}
                    renderItem={item => {
                        return <div>
                            <List.Item>UID:{item.id} </List.Item>
                            <List.Item>反馈内容:{item.content} </List.Item>
                            <List.Item>图片: {item.imgs.map((item, index) => {
                                return <div key={index} style={{display:'inline',marginRight:5}}>
                                    <img src={item} alt=""/>
                                </div>
                            })}
                            </List.Item>
                            <List.Item>手机号:{item.tel} </List.Item>
                            <List.Item>反馈时间:{item.time} </List.Item>
                        </div>
                    }}
                />

            </div>
        );
    }

}


