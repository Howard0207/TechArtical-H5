import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Button from '../../components/Button';
import sha256 from 'sha256';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    render() {
        return (
            <div className="login">
                <Link to="/">首页</Link>
                <Button type={'normal'} >这是按钮</Button>
                <Button type={'normal'} icon={`info-circle`}>{this.state.buttonText}</Button>
                <Button type={'normal'} loading={this.state.loading}>加载中</Button>
            </div>
        )
    }
}
Login.propTypes = {
    name: PropTypes.string
}

module.exports = Login;