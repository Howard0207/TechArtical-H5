import { HashRouter, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
const App = require('./app');
ReactDOM.render(
    <HashRouter>
        <Route exact path="/" component={App}/>
    </HashRouter>
  , document.getElementById('app')
);