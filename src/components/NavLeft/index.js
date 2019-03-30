import React, {Component} from 'react';
import {Menu, Icon} from "antd";
import './index.less'
import MenuConfig from './../../config/menuConfig';

//动态添加菜单栏链接
import {NavLink} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavLeft extends Component {

    state = {
        currentKey: ''
    }

    componentWillMount() {

        const menuTreeNode = this.renderMenu(MenuConfig)
        this.setState({
            menuTreeNode
        })
    }

    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}> {item.title}</NavLink>
            </Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>zxs 管理后台</h1>
                </div>
                <Menu mode="vertical"
                      theme='dark'>
                    {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>*/}
                    {/*遍历后的menu*/}
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }

}

export default NavLeft;
