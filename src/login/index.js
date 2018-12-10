import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Axios from 'axios';
import Button from '../../components/Button';
import sha256 from 'sha256';
import Input from '../../components/Input';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    submit = () => {
        this.props.history.push('/news');
    }

    render() {
        return (
            <div className="login">
                <div className="login-container">
                    <div className="login-header">
                        <div>Hi：）</div>
                        <div>欢迎来到Coder交流社区</div>
                    </div>
                    <div className="login-content">
                        <div className="account-wrapper">
                            <Input type="number" className="login-form-input" />
                            <Input type="password" className="login-form-input" />
                        </div>
                        <Button type={'normal'} onClick={this.submit}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}
Login.propTypes = {
    name: PropTypes.string
}
module.exports = Login;