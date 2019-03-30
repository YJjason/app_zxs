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
import Button from './pages/ui/buttons';
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
                            <Route path='/admin/ui/buttons' component={Button}/>
                        </Admin>
                    </App>
                </BrowserRouter>
            </div>
        );
    }

}