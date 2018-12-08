import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const App = require('../src/app');
const Home = require('../src/home');
const Login = require('../src/login');
class RoutesConfig extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route path='/' component={App} />
            </Switch>
        )
    }
}

module.exports = RoutesConfig;