/**
 * +----------------------------------------------------------------------
 * | editCreate
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Breadcrumb, Form, Input, Select, Radio, Modal, Button, Row, Col, Upload, Icon, message} from 'antd';
import axios from './../../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

class EditCreate extends Component {

    state = {
        list: []
    }

    handleUpdata(fieldForms) {
        axios.ajax({
            url: '/user/newaccount',
            data: {
                param: {...fieldForms}
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success("创建成功")
                window.history.back();
            }
        })
    }

    handleCancel() {
        window.history.back();
    }

    render() {
        return (
            <div>
                <Card>
                    <Breadcrumb separator=">" style={{fontSize: 18}}>
                        <Breadcrumb.Item href="/admin/user/list">用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>新建账号</Breadcrumb.Item>
                    </Breadcrumb>
                </Card>
                <Card>
                    <VersionForm filterForm={this.state.list}
                                 filterItem={this.handleUpdata}
                                 cancelBtn={this.handleCancel}
                    />
                </Card>
            </div>
        );
    }

}

export default EditCreate

class VersionForm extends Component {

    state = {
        loading: false,
    };
    handleClickSave = (e) => {
        const fieldForm = this.props.form.getFieldsValue();
        this.props.filterItem(fieldForm);
    }
    handleClickCancel = () => {
        this.props.cancelBtn();
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    render() {

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 6
            }
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="用户名/昵称" {...formItemLayout}>
                    {
                        getFieldDecorator('nickname', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名/昵称!'
                                }
                            ]
                        })(
                            <Input placeholder="用户名/昵称"/>
                        )
                    }
                </FormItem>
                <FormItem label="身份标签" {...formItemLayout}>
                    {
                        getFieldDecorator('label', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择标签!'
                                }
                            ],
                            initialValue: '0'
                        })(
                            <Select>
                                <option value="0">选择角色</option>
                                <option value="1">用户</option>
                                <option value="2">官方号</option>
                                <option value="3">公司员工</option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="头像" {...formItemLayout}>
                    {
                        getFieldDecorator('img')(
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    // beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
                                </Upload>
                                <Input type='hidden' value={imageUrl}/>
                            </div>
                        )

                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator('sex', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别!'
                                }
                            ]
                        })(
                            <RadioGroup>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="城市" {...formItemLayout}>
                    <Row gutter={8}>
                        <Col span={12}>
                            {
                                getFieldDecorator('city', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择城市!'
                                        },
                                    ],
                                    initialValue: 0
                                })(
                                    <Select>
                                        <Option value={0}>苏州</Option>
                                    </Select>
                                )
                            }
                        </Col>
                        <Col span={12}>
                            {
                                getFieldDecorator('area', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择区域!'
                                        },
                                    ],
                                    initialValue: 0
                                })(
                                    <Select>
                                        <Option value={0}>苏州</Option>
                                    </Select>
                                )
                            }
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="登录密码" {...formItemLayout} >
                    {
                        getFieldDecorator('pwd', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入登录密码!'
                                },
                            ]
                        })(
                            <Input type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label="手机号" {...formItemLayout} >
                    {
                        getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号!'
                                },
                            ]
                        })(
                            <Input type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout} >
                    {
                        getFieldDecorator('statu', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择状态!'
                                    }
                                ],
                                initialValue: 0
                            }
                        )(
                            <Select>
                                <Option value={1}>正常</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="备注" {...formItemLayout} >
                    {
                        getFieldDecorator('remark', {})(
                            <TextArea placeholder="请输入内容"></TextArea>
                        )
                    }
                </FormItem>
                <FormItem label="" {...formItemLayout} wrapperCol={{span: 8, offset: 4}}>
                    {
                        getFieldDecorator('btns')(
                            <div>
                                <Button type="primary" style={{marginRight: 15}}
                                        onClick={this.handleClickSave}>保存</Button>
                                <Button type="default" onClick={this.handleClickCancel}>取消</Button>
                            </div>
                        )
                    }
                </FormItem>

            </Form>
        );
    }

}

VersionForm = Form.create({})(VersionForm)
