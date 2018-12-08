import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Discovery extends Component {
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
            <div className="discovery">
                <div className="sec-one">我喜欢发现新事物</div>
                <div className="sec-two">二段</div>
                <div className="sec-three">三段</div>
                <div className="sec-four">三段</div>
          </div>
        )
    }
}

Discovery.propTypes = {
    name: PropTypes.string
}

module.exports = Discovery;