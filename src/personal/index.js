import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Personal extends Component{
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
              个人中心
          </div>
        )
    }
}

Personal.propTypes = {
    name: PropTypes.string
}

module.exports = Personal;