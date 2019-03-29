import React,{Component} from 'react'
import {Row,Col} from "antd";
import './index.less'

class Header extends Component{

    render() {
        return (
            <div className="header">
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，xxx</span>
                        <a href="javascript:void (0)">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className="breadcrumb-title">
                        <span>首页</span>
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>2019-03-29</span>
                        <span className='weather-img'>
                            <img src="" alt=""/>
                           </span>
                        <span className='weather-detail'>
                             多云
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }

}
export default Header;
