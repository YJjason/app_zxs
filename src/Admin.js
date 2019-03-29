/**
 * +----------------------------------------------------------------------
 * | Admin
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React,{Component} from 'react';
import {Row,Col} from "antd";

import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Home from './pages/Home';
class Admin extends Component{

    render() {
        return (
            <Row className='container'>
                <Col span={3} className='nav-left'>
                    <NavLeft/>
                </Col>
                <Col span={21}>
                    <Header/>
                    <Home/>
                </Col>
            </Row>
        );
    }

}
export default Admin
