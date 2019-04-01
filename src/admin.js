/**
 * +----------------------------------------------------------------------
 * | Admin
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Row, Col} from "antd";

import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Home from './pages/home';
import './style/common.less';

class Admin extends Component {

    render() {
        return (
            <Row className='container'>
                <Col span={3} className='nav-left'>
                    <NavLeft/>
                </Col>
                <Col span={21} className="main">
                    <Header/>
                    <Row className='content'>
                        {/*content*/}
                        {/*<Home/>*/}
                        {/*<Buttons/>*/}
                        {/*加载每个子组件*/}
                        {this.props.children}
                    </Row>
                </Col>
            </Row>
        );
    }

}

export default Admin
