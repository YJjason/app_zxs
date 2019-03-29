import React, {Component} from 'react';
import {Menu, Icon} from "antd";
import './index.less'
import MenuConfig from './../../config/menuConfig';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavLeft extends Component {

    state = {
        currentKey: '',
    }

    componentDidMount() {
        const menuTreeNode = this.rendermenu(MenuConfig);
        let currentKey = window.location.pathname;
        this.setState({
            menuTreeNode,
            currentKey
        })
    }

    rendermenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.child)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>
                {item.title}
                {/* <NavLink to={item.key}>
                    {item.title}
                </NavLink>*/}
            </Menu.Item>

        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>zxs 后台管理</h1>
                </div>
                <Menu style={{background: '#304156'}} mode="vertical" theme="dark">
                    <SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Iteom 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigation Two</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting"/><span>Navigation Three</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>,
            </div>
        );
    }

}

export default NavLeft;
