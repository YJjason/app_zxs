/**
 * +----------------------------------------------------------------------
 * | editList
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Breadcrumb, Form, Input, Radio, Button, Select} from "antd";

import axios from './../../../axios';

import './../userlist.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class EditList extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        const userId = this.props.match.params.id
        this.requestList(userId)
    }

    requestList = (id) => {
        axios.ajax({
            url: 'user/getuserinfo',
            data: {
                param: id
            }
        }).then(res => {
            if (res.code == 0) {
                this.setState({
                    list: res.data.item_list
                })
            }
        })
    }

    /*编辑更新*/
    handleUpdata(fieldForms) {
        const id = fieldForms['uid'];
        const type = fieldForms['label'];
        const status = fieldForms['status'];
        const remark = fieldForms['remark'];
        axios.ajax({
            url: '/user/useredit',
            data: {
                param: {
                    id,
                    type,
                    status,
                    remark
                }
            }
        }).then(res=>{
            if(res.code==0){

            }
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <Breadcrumb separator=">" style={{fontSize: 18}}>
                        <Breadcrumb.Item href="/admin/user/list">用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>编辑账号</Breadcrumb.Item>
                    </Breadcrumb>
                </Card>
                <Card style={{marginTop: 10}}>
                    <FormAccount filterForm={this.state.list} filterItem={this.handleUpdata}>
                    </FormAccount>

                </Card>

            </div>
        );
    }

}

export default EditList

class FormAccount extends Component {
    handleSelectChange = (value) => {
        /*  this.props.form.setFieldsValue({
              note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
          });*/
    }
    handleClickSave = () => {
        const fieldForm = this.props.form.getFieldsValue();
        console.log(123, fieldForm);
        this.props.filterItem(fieldForm);
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 5
            }
        }
        const {getFieldDecorator} = this.props.form;
        const data = this.props.filterForm || '';
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="UID" {...formItemLayout}>
                        {
                            getFieldDecorator("uid", {
                                initialValue: data.id
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="用户名/昵称" {...formItemLayout}>
                        {
                            getFieldDecorator("nickName", {
                                initialValue: data.nick_name
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="身份标签" {...formItemLayout}>
                        {
                            getFieldDecorator("label", {
                                initialValue: (data.type + '')
                            })(
                                <Select
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="1">用户</Option>
                                    <Option value="2">官方号</Option>
                                    <Option value="3">公司员工</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="头像" {...formItemLayout}>
                        {
                            getFieldDecorator("headPic", {
                                initialValue: data.logo
                            })(
                                <div>
                                    <Input type="hidden"/>
                                    <img src={data.logo}></img>
                                </div>
                            )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator("sex", {
                                initialValue: data.sex == 0 ? "女" : '男'
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="城市" {...formItemLayout}>
                        {
                            getFieldDecorator("city", {
                                initialValue: data.city_id
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="登录密码" {...formItemLayout}>
                        {
                            getFieldDecorator("psw", {
                                initialValue: data.user_pwd
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号" {...formItemLayout}>
                        {
                            getFieldDecorator("phone", {
                                initialValue: data.tel
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        {
                            getFieldDecorator("status", {
                                initialValue: (data.status + '') || '0'
                            })(
                                <Select>
                                    <Option value="0">启用</Option>
                                    <Option value="1">禁用</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="文章数" {...formItemLayout}>
                        {
                            getFieldDecorator("article", {
                                initialValue: data.article_count
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="收藏数" {...formItemLayout}>
                        {
                            getFieldDecorator("collection", {
                                initialValue: data.collection_count
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="评论数" {...formItemLayout}>
                        {
                            getFieldDecorator("comment", {
                                initialValue: data.comment_count
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="注册时间" {...formItemLayout}>
                        {
                            getFieldDecorator("register", {
                                initialValue: data.time
                            })(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        {
                            getFieldDecorator("remark", {
                                initialValue: data.remark
                            })(
                                <TextArea/>
                            )
                        }
                    </FormItem>
                    <FormItem label="" {...formItemLayout} wrapperCol={{span: 4, offset: 2}}>
                        {
                            getFieldDecorator("btns")(
                                <div>
                                    <Button type="primary" style={{marginRight: 15}}
                                            onClick={this.handleClickSave}>保存</Button>
                                    <Button type="default">取消</Button>
                                </div>
                            )
                        }
                    </FormItem>
                </Form>

            </div>
        );
    }

}

FormAccount = Form.create({})(FormAccount);

