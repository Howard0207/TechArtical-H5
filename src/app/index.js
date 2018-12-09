import { Route, Switch, IndexRoute } from 'react-router-dom';
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Header from '../common/header';
import Footer from '../common/footer';
import PropTypes from 'prop-types';
var News = require('../news');
var Discovery = require('../discovery');
var Personal = require('../personal');
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    render() {
        const location = this.props.location;
        console.log(this.props.location);
        return (
            <div className="app-wrapper">
                <Header />
                <TransitionGroup className="app-content">
                    <CSSTransition key={location.key} classNames="fade" timeout={500}>
                        <Switch location={location}>
                            <Route exact path="/" component={News}></Route>
                            <Route exact path="/news" component={News}></Route>
                            <Route exact path="/discovery" component={Discovery}></Route>
                            <Route exact path="/personal" component={Personal}></Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

App.propTypes = {
    name: PropTypes.string
}

module.exports = App;