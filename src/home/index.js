import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
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
            <div className="personal">
                这是home页面
          </div>
        )
    }
}

Home.propTypes = {
    name: PropTypes.string
}

module.exports = Home;