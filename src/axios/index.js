/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import JsonP from 'jsonp';

import axios from 'axios';
import {Modal} from 'antd';
import Utils from './../utils/utils'
export default class Axios {

    static jsonp(option) {
        return new Promise((resolve, reject) => {
            JsonP(option.url, {
                param: 'callback'
            }, function (err, res) {
                if (res.status === 'success') {
                    resolve(res)
                } else {
                    reject(res.error)
                }
            })
        })
    }

    static ajax(option) {
        const baseApi = 'https://www.easy-mock.com/mock/5c9d841bbdcc8e1936407e56/admin';
        return new Promise((resolve, reject) => {
            axios({
                url: option.url,
                baseURL: baseApi,
                method: 'GET',
                timeout: 5000,
                params: (option.data && option.data.param) || ''
            }).then((response) => {

                if (response.status === 200) {
                    let res = response.data;
                    if (res.code == 0) {
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '错误提示',
                            message: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
    /*查询*/
    static requestList(_this,url,params){
        var data ={
            params:params
        }
        this.ajax({
            url:url,
            data
        }).then((data)=>{
            if (data&& data.data) {
                _this.setState({
                    list: data.data.item_list.map((item, index) => {
                        item.key = index;
                        return item
                    }),
                    total:data.data.all_count,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }
}
