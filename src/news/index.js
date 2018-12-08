import React,{Component} from 'react';
import PropTypes from 'prop-types';

class News extends Component{
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
          <div className="news">
              资讯中心
          </div>
        )
    }
}

News.propTypes = {
    name: PropTypes.string
}

module.exports = News;