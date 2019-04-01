import React, {Component} from 'react';
import {Menu, Icon} from "antd";
import './index.less'
import MenuConfig from './../../config/menuConfig';

//动态添加菜单栏链接
import {NavLink} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavLeft extends Component {

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
        currentKey: ''
    };

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
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>zxs 管理后台</h1>
                </div>
                <Menu mode="inline"
                      theme='dark'
                      openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}
                >
                    {/*遍历后的menu*/}
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }

}

export default NavLeft;
