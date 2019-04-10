/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Row, Col, Card, Input, Button, Form, Select, DatePicker, Table, message, Modal, Radio} from "antd";
import axios from './../../axios';
import Utils from './../../utils/utils';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
//封装组件
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

export default class Upgrade extends Component {

    state = {
        list: [],
        total: '',
        isUserVisible: false
    }
    params = {
        page: 1,
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

    // 删除
    handleClick(obj) {
        const _this = this;
        Modal.confirm({
            title: '提示',
            content: '确认要删除选中',
            onOk() {
                axios.ajax({
                    url: "/upgrade/delversion",
                    data: {
                        params: obj.id
                    }
                }).then((res) => {
                    if (res.code == 0) {
                        _this.requestList();
                    }
                })
            }
        })
    }

    handleAdd() {
        this.setState({
            isUserVisible: true
        })
    }

    /*封装头部基础组件*/
    formList = [
        {
            type: 'SELECT',
            label: '系统分类',
            placeholder: '全部',
            initialValue: '0',
            width: 100,
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
            type: '时间查询',
            label: '请选择入职如期',
            placeholder: '请选择日期',
            width: 75,
            filter: 'begin_time',
        },
    ]
    /*查询*/
    handleFilter = (fieldsValue) => {
        let _this = this;
        const sys = fieldsValue['system_class'];
        const sysName = fieldsValue['system_name'];
        const begin_time = moment(fieldsValue['timeStart']).format('YYYY-MM-DD') || "";
        const end_time = moment(fieldsValue['timeEnd']).format('YYYY-MM-DD') || "";

        // axios.requestList(this, '/upgrade/list', this.params)
        // this.requestList();
        axios.ajax({
            url: '/upgrade/list',
            data: {
                param: {
                    page: this.params.page,
                    sys,
                    sysName,
                    begin_time,
                    end_time
                }
            }
        }).then((res) => {
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
    handleVersionSubmit = () => {
        const data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/upgrade/add',
            data: {
                param: {
                    params: data
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isUserVisible: false
                })
                message.success('创建新版本成功')
                /*表单内容清空*/
                this.roleForm.props.form.resetFields();
                this.requestList();
            } else {
                message.error(res)
            }

        })
    }

    render() {
        const colums = [
            {
                title: '排序ID',
                dataIndex: 'id',
                width: 75,
                align:"center"
            }, {
                title: '系统',
                dataIndex: 'category',
                width: 75,
                align:"center"

            }, {
                title: '版本号',
                dataIndex: 'version_code',
                width: 75,
                align:"center"
            }, {
                title: '版本名称',
                dataIndex: 'version',
                width: 75,
                align:"center"
            }, {
                title: 'APP下载链接',
                dataIndex: 'link',
                width: 50
            }, {
                title: '是否强制下载',
                dataIndex: 'upgrade',
                width: 70,
                align:"center",
                render: (render, obj) => {
                    return obj.upgrade = obj.upgrade == '0' ? '否' : '是';
                }
            }, {
                title: '升级内容',
                dataIndex: 'content',
                width: 150,
                align:"center"
            }, {
                title: '发布时间',
                dataIndex: 'release_time',
                width: 75,
                align:"center"
            }, {
                title: '操作',
                dataIndex: 'sys_opera',
                width: 75,
                align:"center",
                render: (record, obj) => {
                    return <a href="#" onClick={() => this.handleClick(obj)}>删除</a>
                }

            }
        ]
        return (
            <div>
                <Card title='升级管理'>
                    <Col span={20}>
                        {/*<FilterForm filterSubmit={this.handleFilter} formList={this.formList}
                                    handleClickBtn={this.handleAdd.bind(this)}/>*/}
                        {/*<BaseForm formList={this.formList} filterSubmit={this.handleFilter} handleClickBtn={this.handleAdd.bind(this)} />*/}
                        <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                    </Col>
                    <Col span={2}>   <Button type="primary"
                                    style={{backgroundColor: '#67c23a', color: '#fff', border: 'none'}}
                                    onClick={this.handleAdd.bind(this)}
                    >新建版本</Button></Col>
                </Card>
                <Card>
                    <Col><h1 style={{fontSize: 18}}>全部(<span
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
                {/*弹窗*/}
                <Modal
                    title="新建版本"
                    visible={this.state.isUserVisible}
                    onOk={this.handleVersionSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false,
                        })
                    }}
                >
                    <VersionForm
                        wrappedComponentRef={(inst) => {  //获取嵌套表格内容
                            this.roleForm = inst
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

/*子组件1*/
/*class FilterForm extends Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    handleClickNew = () => {
        this.props.handleClickBtn();
    }
    onTimeStartChange = (value) => {
        if (value) {
            const form = this.props.form;
            const timeEnd = form.getFieldValue('timeEnd');
            if (timeEnd) form.validateFieldsAndScroll(['timeEnd']);
        }
    };
    onTimeEndChange = (value) => {
        if (value) {
            const form = this.props.form;
            const timeStart = form.getFieldValue('timeStart');
            if (timeStart) form.validateFieldsAndScroll(['timeStart']);
        }
    };

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
                    {getFieldDecorator('timeStart', {
                        rules: [
                            {
                                validator: (rule, value, callback) => {
                                    const timeEnd = this.props.form.getFieldValue('timeEnd');
                                    if (timeEnd && timeEnd.isBefore(value)) {
                                        callback('开始时间必须小于结束时间');
                                    } else {
                                        callback();
                                    }
                                }
                            }
                        ]
                    })(<DatePicker onChange={this.onTimeStartChange} locale={locale} placeholder="请选择开始时间"/>)}
                </FormItem>
                <FormItem label="">
                    {getFieldDecorator('timeEnd', {
                        rules: [
                            {
                                validator: (rule, value, callback) => {
                                    const timeStart = this.props.form.getFieldValue('timeStart');
                                    if (timeStart && timeStart.isAfter(value)) {
                                        callback('结束时间必须大于开始时间');
                                    } else {
                                        callback();
                                    }
                                }
                            }
                        ]
                    })(<DatePicker onChange={this.onTimeEndChange} locale={locale} placeholder="请选择结束时间"/>)}
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{marginRight: 300}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button type="primary"
                            style={{backgroundColor: '#67c23a', color: '#fff', border: 'none'}}
                            onClick={this.handleClickNew}
                    >新建版本</Button>
                </FormItem>
            </Form>
        );
    }

}

FilterForm = Form.create({})(FilterForm);*/

/*子组件2*/
class VersionForm extends Component {

    render() {
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="升级系统" {...formItemLayout}>
                    {
                        getFieldDecorator("state", {
                            rules: [
                                {required: true}
                            ]
                        })(
                            <RadioGroup>
                                <Radio value={1}>Android</Radio>
                                <Radio value={2}>IOS</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="版本号" {...formItemLayout}>
                    {
                        getFieldDecorator("ver_num", {
                            rules: [
                                {required: true,}
                            ]
                        })(
                            <Input type='text' placeholder='请输入版本号'/>
                        )
                    }
                </FormItem>
                <FormItem label="版本名称" {...formItemLayout}>
                    {
                        getFieldDecorator("ver_name", {
                            rules: [
                                {required: true}
                            ]
                        })(
                            <Input type='text' placeholder='请输入版本名称'/>
                        )
                    }
                </FormItem>
                <FormItem label="app下载链接地址" {...formItemLayout}>
                    {
                        getFieldDecorator("app_addr", {
                            rules: [
                                {required: true}
                            ]
                        })(
                            <Input type='text' placeholder='请输入app链接地址'/>
                        )
                    }
                </FormItem>
                <FormItem label="是否强制升级" {...formItemLayout}>
                    {
                        getFieldDecorator("upgrade", {
                            rules: [
                                {required: true}
                            ]
                        })(
                            <RadioGroup>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="升级内容" {...formItemLayout}>
                    {
                        getFieldDecorator("upgrade_content")(
                            <TextArea placeholder="升级内容"></TextArea>
                        )
                    }
                </FormItem>

            </Form>
        );
    }

}

VersionForm = Form.create({})(VersionForm);
