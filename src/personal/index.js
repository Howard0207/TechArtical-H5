import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Direction from '../../components/Direction';
class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    handleTap = () => {
        console.log('handleTap')
    }

    handleLongTap = () => {
        console.log('handleLongTap')
    }

    click = () => {
        console.log('click');
    }

    render() {
        return (
            <div className="personal">
                个人中心
                <Button value="按钮" onTap={this.handleTap} onLongTap={this.handleLongTap} />
                <Direction>
                    地v从
                    地v从
                    地v从
                    地v从
                    地v从
                </Direction>
            </div>
        )
    }
}

Personal.propTypes = {
    name: PropTypes.string
}

module.exports = Personal;