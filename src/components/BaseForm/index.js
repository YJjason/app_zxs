/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Input, Select, Form, Button, Checkbox, Radio, DatePicker} from "antd";
import Utils from '../../utils/utils';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {
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

    initFormList = () => {
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList; // 从父组件Order.js 中获取该对象进行使用
        console.log(123, formList)
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.filter;
                let initialValue = item.initialValue || ''; //默认给空字符串
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '城市') {
                    const city = <FormItem label="城市" key={field}>
                        {
                            getFieldDecorator('city', {
                                initialValue: '0'
                            })(
                                <Select
                                    style={{width: 80}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList([{id: '0', name: '全部'}, {id: '1', name: '北京'}, {
                                        id: '2',
                                        name: '上海'
                                    }, {id: '3', name: '天津'}, {id: '4', name: '杭州'}])}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(city);
                } else if (item.type == '时间查询') {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('timeStart', {
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
                            })(
                                <DatePicker onChange={this.onTimeStartChange} locale={locale} placeholder="请选择开始时间"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {console.log('begin',field)}
                        {
                            getFieldDecorator('timeEnd', {
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
                            })(
                                <DatePicker onChange={this.onTimeEndChange} locale={locale} placeholder="请选择结束时间"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time);

                } else if (item.type == 'INPUT') {
                    // 中括号 [变量]  ,会将其看作变量对待
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Input type='text' style={{width: [width]}} placeholder={placeholder}/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (item.type == 'SELECT') {
                    // 中括号 [变量]  ,会将其看作变量对待
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{width: width}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked', // 设置checkbox的属性
                                initialValue: initialValue // true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                } else if (item.type == 'DATE') {
                    const Date = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(Date);
                }
            });
        }
        return formItemList;
    };


    render() {

        return (
            <Form layout='inline'>
                {this.initFormList()}
                {/*<FormItem label="系统分类:">
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
                </FormItem>*/}
                <FormItem>
                    <Button type="primary" style={{marginRight: 100}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button type="primary"
                            style={{backgroundColor: '#67c23a', color: '#fff', border: 'none'}}
                            onClick={this.handleClickNew}
                    >新建版本</Button>
                </FormItem>
            </Form>
        );
    }

}

export default FilterForm = Form.create({})(FilterForm)
/*
class FilterForm extends Component{
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();// 获取表单的值
        this.props.filterSubmit(fieldsValue); // 将子组件的值传递到父组件(order.js)
    };

    reset = () => {
        this.props.form.resetFields(); // 重置表单的方法
    };

   /!* handleOnChange=(e)=>{
        console.log(123,e.target.value)
    }*!/
    initFormList = () => {
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList; // 从父组件Order.js 中获取该对象进行使用
        const formItemList = [];

        function onChange(value, dateString) {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        }
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.filter;
                let initialValue = item.initialValue || ''; //默认给空字符串
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == 'SELECT') {
                    const city = <FormItem label="城市" key={field}>
                        {
                            getFieldDecorator('system_id', {
                                initialValue: '0'
                            })(
                                <Select
                                    style={{width: 150}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList([{id: '0', name: '系统分类'}, {id: '1', name: 'Android'}, {
                                        id: '2',
                                        name: 'IOS'
                                    }])}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(city);
                } else if (item.type == 'DATE') {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time',{
                            })(
                                <DatePicker showTime={false} locale={locale} onChange={onChange}  placeholder={placeholder} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time);

                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={false} locale={locale}  placeholder={placeholder} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time);

                } else if (item.type == 'INPUT') {
                    // 中括号 [变量]  ,会将其看作变量对待
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Input type='text' style={{width: [width]}} placeholder={placeholder}/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (item.type == 'SELECT') {
                    // 中括号 [变量]  ,会将其看作变量对待
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{width: width}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked', // 设置checkbox的属性
                                initialValue: initialValue // true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                } else if (item.type == 'DATE') {
                    const Date = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{

                            })(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(Date);
                }
            });
        }
        return formItemList;
    };

    render() {
        return (
            <Form layout='inline'>
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    {/!*<Button onClick={this.reset}>重置</Button>*!/}
                </FormItem>
            </Form>
        );
    }

}
export default Form.create({})(FilterForm);
*/
