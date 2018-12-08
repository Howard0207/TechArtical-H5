import { HashRouter,BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import RoutesConfig from '../route';
ReactDOM.render(
    <BrowserRouter>
        <RoutesConfig />
    </BrowserRouter>
  , document.getElementById('app')
);