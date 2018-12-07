import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Button from '../../../components/Button';
import sha256 from 'sha256';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerText: "招银云创",
            loading: false,
            buttonText: '警告信息',
            isBack: true
        }
    }

    render() {
        return (
            <div className="header">
                <div href="javascript:void(0)" className="hashBack">{this.state.isBack&&<i className="iconfont icon-arrowleft"></i>}</div>
                <div>{this.state.headerText}</div>
                <div>{"登录"}</div>
            </div>
        )
    }

}
Header.propTypes = {
    name: PropTypes.string
}

module.exports = Header;