/**
 * +----------------------------------------------------------------------
 * | Router
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {HashRouter, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import App from './App'
import Home from './pages/home';
import Login from './pages/login';
import Admin from './admin';

import Upgrade from './pages/upgrade';
import FeedBack from './pages/user/feedback';
import UserList from './pages/user/list';

import Nomatch from './pages/nomatch';

export default class IRouter extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <App>
                        <Admin>
                            <Route path='/login' component={Login}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/admin/upgrade' component={Upgrade}/>
                            <Route path='/admin/user/feedback' component={FeedBack}/>
                            <Route path='/admin/user/list' component={UserList}/>

                        </Admin>
                    </App>
                </BrowserRouter>
            </div>
        );
    }

}
