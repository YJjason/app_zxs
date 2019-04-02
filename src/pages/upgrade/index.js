/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Row, Col, Card, Input, Button, Form, Select, DatePicker, Table, Message} from "antd";
import axios from './../../axios';
import Utils from './../../utils/utils';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
//封装组件
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;
export default class Upgrade extends Component {

    state = {
        list: [],
        total: '',
    }
    params = {
        page: 1
    };

    componentWillMount() {
        this.requestList();
    }


    requestList = () => {
        let _this = this;
        // axios.requestList(this, '/upgrade/list', this.params)
                 axios.ajax({
                     url: '/upgrade/list',
                     data: {
                         param: {
                             page: this.params.page
                         }
                     }
                 })
                     .then((res) => {
                         console.log(123213,res)
                         let list = res.data.item_list.map((item, index) => {
                             item.key = index;
                             return item;
                         });
                         this.setState({
                             list: list,
                             total: res.data.all_count,
                             pagination: Utils.pagination(res, (current) => {
                                 _this.params.page = current;
                                 _this.requestList()
                             })
                         })

                     })
    }

    handleClick(obj) {
        console.log(12321, obj)
        const nowId = obj.id;

    }

    /*封装头部基础组件*/
    formList = [
        {
            type: 'SELECT',
            label: '系统分类',
            placeholder: '全部',
            initialValue: '0',
            width: 200,
            filter: 'system_id',
            list: [
                {
                    id: '0',
                    name: '系统分类'
                },
                {
                    id: '1',
                    name: 'Android'
                },
                {
                    id: '2',
                    name: 'IOS'
                }
            ]
        },
        {
            type: 'TIME_SEARCH',

        },
        {
            type: 'INPUT',
            label: '订单状态',
            placeholder: '订单状态',
            filter: 'order_statu',
            width: 100,

        },

        {
            type: 'DATE',
            label: '请选择入职如期',
            placeholder: '请选择日期',
            width: 100,
            filter: 'begin_time',
        },
    ]
    /*查询*/
    handleFilter = (fieldsValue) => {
        const sys = fieldsValue['system_class'];
        const sysId = fieldsValue.system_class;
        const sysName = fieldsValue.system_name;
        const begin_time = moment().format('YYYY-MM-DD', fieldsValue['begin_time']._d);
        const end_time = moment().format('YYYY-MM-DD', fieldsValue['end_time']._d);
        this.params = {
            sysId,
            sysName,
            begin_time,
            end_time
        }
        this.requestList();
    }

    render() {
        const colums = [
            {
                title: '排序ID',
                dataIndex: 'id',
                width: 75
            }, {
                title: '系统',
                dataIndex: 'category',
                width: 75

            }, {
                title: '版本号',
                dataIndex: 'version_code',
                width: 75
            }, {
                title: '版本名称',
                dataIndex: 'version',
                width: 75
            }, {
                title: 'APP下载链接',
                dataIndex: 'link',
                width: 50
            }, {
                title: '升级内容',
                dataIndex: 'content',
                width: 100
            }, {
                title: '发布时间',
                dataIndex: 'release_time',
                width: 75
            }, {
                title: '操作',
                dataIndex: 'sys_opera',
                width: 75,
                render: (obj) => {
                    return <a href="#" onClick={() => this.handleClick(obj)}>删除</a>
                }

            }
        ]
        return (
            <div>
                <Card title='升级管理'>
                    <Col span={22}>
                        <FilterForm filterSubmit={this.handleFilter}/>
                        {/*<BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>*/}
                    </Col>
                </Card>
                <Card>
                    <Col><h1 style={{margin: 5, fontSize: 18}}>全部(<span
                        style={{color: '#67C23A'}}>{this.state.total}</span>)</h1></Col>
                    <div className="content-wrap">
                        <Table
                            bordered
                            columns={colums}
                            dataSource={this.state.list}
                            pagination={this.state.pagination}
                        />
                    </div>

                </Card>
            </div>
        );
    }

}

class FilterForm extends Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
        /*   const sys = fieldsValue['system_class'];
           const begin_time = moment().format('YYYY-MM-DD',fieldsValue['begin_time']._d);
           const end_time = moment().format('YYYY-MM-DD',fieldsValue['end_time']._d);
   */
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout='inline'>
                <FormItem label="系统分类:">
                    {
                        getFieldDecorator("system_class")(
                            <Select style={{width: 100}} placeholder="系统分类">
                                <Option value="">系统分类</Option>
                                <Option value="1">Android</Option>
                                <Option value="2">IOS</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="版本名称:">
                    {
                        getFieldDecorator("system_name")(
                            <Input placeholder="版本名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="时间:">
                    {
                        getFieldDecorator("begin_time", {
                            initialValue: '',
                            validateTrigger: 'onChange'
                        })(
                            <DatePicker locale={locale} showTime={true} placeholder="开始时间" format="YYYY-MM-DD"/>
                        )
                    }
                </FormItem>
                <FormItem label="">
                    {
                        getFieldDecorator('end_time', {
                            initialValue: '',
                            validateTrigger: 'onChange'
                        })(
                            <DatePicker locale={locale} showTime={true} placeholder="结束时间" format="YYYY-MM-DD"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{marginRight: 300}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button type="primary"
                            style={{backgroundColor: '#67c23a', color: '#fff', border: 'none'}}>新建版本</Button>
                </FormItem>
            </Form>
        );
    }

}

FilterForm = Form.create({})(FilterForm);
